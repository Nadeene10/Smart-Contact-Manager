let nameInput = document.getElementById("fullname")
let phoneInout = document.getElementById("phone")
let emailInput = document.getElementById("email")
let addressInput = document.getElementById("address")
let groupInput = document.getElementById("group")
let noteInput = document.getElementById("note")
let favInput = document.getElementById("fav")
let emrgncInput = document.getElementById("emrgnc")
let searchInput = document.getElementById("searchContact")
let changeImage = document.getElementById("image")

let contactData = JSON.parse(localStorage.getItem("contactcontainer")) || []
displayContact()
displayFavorites()
displayEmergency()

let updatecontact = null


function clickOpen() {
    openModal()
}

function openModal() {
    let open = document.getElementById("contact-modal")
    open.classList.remove("d-none")
    document.getElementById("modalOverlay").classList.remove("d-none")

    nameInput.value = ""
    phoneInout.value = ""
    emailInput.value = ""
    addressInput.value = ""
    groupInput.value = ""
    noteInput.value = ""

}

function clickClose() {
    closeModal()
}

function closeModal() {
    let close = document.getElementById("contact-modal")
    close.classList.add("d-none")
    document.getElementById("modalOverlay").classList.add("d-none")

}

function saveContact() {

    let isNameValid = validateName()
    let isPhoneValid = validatePhone()
    let isEmailValid = validateEmail()

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        return
    }
    console.log("button clicked")
    let dataOFContact = {
        phone: phoneInout.value,
        name: nameInput.value,
        phone: phoneInout.value,
        email: emailInput.value,
        address: addressInput.value,
        group: groupInput.value,
        note: noteInput.value,
        fav: favInput.checked,
        emrgnc: emrgncInput.checked
    }

    if (updatecontact === null) {
        contactData.push(dataOFContact)
        Swal.fire({
            title: "Added!",
            icon: "success",
            text: "Contact has been added",
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        contactData[updatecontact] = dataOFContact
        Swal.fire({
            title: "Updated!",
            text: "Contact has been updated successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
        })
    }

    localStorage.setItem("contactcontainer", JSON.stringify(contactData))
    console.log(contactData)


    updatecontact = null
    displayContact()
    displayFavorites()
    displayEmergency()
    clickClose()
}
function displayContact() {
    let cartona = `<div class="row gy-4">`;
    for (let i = 0; i < contactData.length; i++) {
        cartona += ` <div class="col-12 col-xl-6">
            <div class="dispalycontact w-100 bg-white rounded-4">
                <div class="d-flex align-items-center gap-3">
                   <div class="contact-img d-flex align-items-center justify-content-center ">
                       <span class="text-white fw-bold text-capitalize ">${contactData[i].name.split(" ")[0][0]}${contactData[i].name.split(" ")[1] ? contactData[i].name.split(" ")[1][0] : ""}</span>
    ${contactData[i].fav ? `<div class="star"><i class="fa-solid fa-star"></i></div>` : ""}
    ${contactData[i].emrgnc ? `<div class="heart"><i class="fa-solid fa-heart-pulse"></i></div>` : ""}
</div>
                    <div class="contact-info">
                        <h3 class="my-1">${contactData[i].name}</h3>
                        <div class="d-flex align-items-center gap-1">
                            <i class="rounded-2 fa-solid fa-phone"></i><span>${contactData[i].phone}</span>
                        </div>
                    </div>
                </div>
                <div class="contact-way my-3">
                    <div class="d-flex align-items-center gap-2 my-2">
                        <div class="bgicon">
                            <i class="rounded-3 fa-solid fa-envelope"></i>
                        </div>
                        <span>${contactData[i].email}</span>
                    </div>
                    <div class="d-flex align-items-center my-2 gap-2">
                        <div class="bgicon2 d-flex align-items-center justify-content-center">
                            <i class="rounded-3 fa-solid fa-location-dot"></i>
                        </div>
                        <span>${contactData[i].address}</span>
                    </div>
                <div class="d-flex align-items-center gap-2 my-3 rowss">
    ${contactData[i].group !== "Select a group" ? `<div class="type type-${contactData[i].group} rounded-3 px-3 py-1 my-3"><span>${contactData[i].group}</span></div>` : ""}
    ${contactData[i].emrgnc ? `<div class="emr-note rounded-3 px-2 py-1 my-3"><i class="fa-solid fa-heart-pulse"></i> Emergency</div>` : ""}
</div>
</div>
                <div class="card-footer mt-4 ">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                            <div class="icn1 rounded-3">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="icn2 rounded-3">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                           <div class="icn3 text-secondary rounded-3">
    <i onclick ="toggleFav(${i})"  class="${contactData[i].fav ? "fa-solid fa-star text-warning" : "fa-regular fa-star"}"></i>
</div>
                          <div class="icn4 text-secondary rounded-3">
    <i onclick ="toggleEmrgn(${i})" class="${contactData[i].emrgnc ? "fa-solid fa-heart-pulse text-danger" : "fa-regular fa-heart"}"></i>
</div>
                            <div class="icn5 text-secondary rounded-3">
                                <i onclick ="update(${i})" class="fa-solid fa-pen"></i>
                            </div>
                            <div class="icn6 text-secondary rounded-3">
                                <i onclick= "deleteContact(${i})" class="fa-solid fa-trash"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("contact-card").innerHTML = cartona
    document.getElementById("totalCount").textContent = contactData.length
    document.getElementById("total").textContent = `Manage and organize your ${contactData.length} contacts`
}

function validateName() {
    let namevalid = /^[A-Za-z\s]{2,50}$/
    if (!namevalid.test(nameInput.value.trim())) {
        document.getElementById("nameError").textContent = "Name should contain only letters and spaces (2-50 characters)"
        return false
    }
    else {
        document.getElementById("nameError").textContent = ""
        return true
    }
}
function validatePhone() {
    let phonevalid = /^01[0125][0-9]{8}$/
    if (!phonevalid.test(phoneInout.value.trim())) {
        document.getElementById("phoneError").textContent = "Please enter a valid Egyptian phone number"
        return false
    }
    else {
        document.getElementById("phoneError").textContent = ""
        return true
    }
}
function validateEmail() {
    let emailvaild = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    if (emailInput.value.trim() !== "" && !emailvaild.test(emailInput.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address"
        return false
    }
    else {
        document.getElementById("emailError").textContent = ""
        return true
    }
}
function deleteContact(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contactData[index].name} ? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: false
    }).then((result) => {
        if (result.isConfirmed) swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Contact has been deleted.",
            icon: "success"
        });
        else if (result.dismiss === Swal.DismissReason.cancel)
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
    });
    contactData.splice(index, 1)
    displayContact()
    displayFavorites()
    displayEmergency()
    localStorage.setItem("contactcontainer", JSON.stringify(contactData))
}
function update(index) {
    openModal()
    updatecontact = index

    nameInput.value = contactData[index].name
    phoneInout.value = contactData[index].phone
    emailInput.value = contactData[index].email
    addressInput.value = contactData[index].address
    groupInput.value = contactData[index].group
    noteInput.value = contactData[index].note
}

function searchContact() {
    let cartona = `<div class="row gy-4">`;
    for (let i = 0; i < contactData.length; i++) {
        if (contactData[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) || (contactData[i].email.toLowerCase().includes(searchInput.value.toLowerCase())) || (contactData[i].phone.toLowerCase().includes(searchInput.value.toLowerCase()))) {
            cartona += ` <div class="col-6">
            <div class="dispalycontact w-100 bg-white rounded-4">
                <div class="d-flex align-items-center gap-3">
                    <div class="contact-img">
                    </div>
                    <div class="contact-info">
                        <h3 class="my-1">${contactData[i].name}</h3>
                        <div class="d-flex align-items-center gap-1">
                            <i class="rounded-2 fa-solid fa-phone"></i><span>${contactData[i].phone}</span>
                        </div>
                    </div>
                </div>
                <div class="contact-way my-3">
                    <div class="d-flex align-items-center gap-2 my-2">
                        <div class="bgicon">
                            <i class="rounded-3 fa-solid fa-envelope"></i>
                        </div>
                        <span>${contactData[i].email}</span>
                    </div>
                    <div class="d-flex align-items-center my-2 gap-2">
                        <div class="bgicon2 d-flex align-items-center justify-content-center">
                            <i class="rounded-3 fa-solid fa-location-dot"></i>
                        </div>
                        <span>${contactData[i].address}</span>
                    </div>
                    <div class="type rounded-3 px-3 py-1 my-3">
                        <span>${contactData[i].group}</span>
                    </div>
                </div>
                <div class="card-footer mt-4 ">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                            <div class="icn1 rounded-3">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="icn2 rounded-3">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                                                      <div class="icn3 text-secondary rounded-3">
    <i class="${contactData[i].fav ? "fa-solid fa-star text-warning" : "fa-regular fa-star"}"></i>
</div>
                          <div class="icn4 text-secondary rounded-3">
    <i class="${contactData[i].emrgnc ? "fa-solid fa-heart-pulse text-danger" : "fa-regular fa-heart"}"></i>
</div>
                            <div class="icn5 text-secondary rounded-3">
                                <i onclick ="update(${i})" class="fa-solid fa-pen"></i>
                            </div>
                            <div class="icn6 text-secondary rounded-3">
                                <i onclick= "deleteContact(${i})" class="fa-solid fa-trash"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById("contact-card").innerHTML = cartona
}

function displayFavorites() {
    let favCards = `<div class="row gy-3">`
    let count = 0
    for (let i = 0; i < contactData.length; i++) {
        if (contactData[i].fav) {
            count++
            favCards += ` <div class="col-12">
            <div class="minicard rounded-3 d-flex align-items-center justify-content-between gap-2">
                <div class="d-flex align-items-center gap-1">
                    <div class="contact-img d-flex align-items-center justify-content-center">
                                           <span class="text-white fw-bold text-capitalize ">${contactData[i].name.split(" ")[0][0]}${contactData[i].name.split(" ")[1] ? contactData[i].name.split(" ")[1][0] : ""}</span>

                    </div>
                    <div class="contact-info">
                        <h3 class="my-1">${contactData[i].name}</h3>
                        <div class="d-flex align-items-center gap-1">
                            <span>${contactData[i].phone}</span>
                        </div>
                    </div>
                </div>
                <div class="iconn rounded-3"><i class="rounded-3 fa-solid fa-phone"></i></div>
            </div>
        </div>`
        }
    }
    favCards += `</div>`

    if (count === 0) {
        document.getElementById("favList").innerHTML = `<div class="down d-flex align-items-center justify-content-center"><span>No favorites yet</span>`
    } else {
        document.getElementById("favList").innerHTML = favCards
    }
    document.getElementById("favCount").textContent = count
}
function displayEmergency() {
    let emrgnCards = `<div class="row gy-3">`
    let count = 0
    for (let i = 0; i < contactData.length; i++) {
        if (contactData[i].emrgnc) {
            count++
            emrgnCards += `      <div class="col-12">
                                <div class="minicard2 rounded-3 d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center gap-1">
                                        <div class="contact-img2 d-flex align-items-center justify-content-center">
                                             <span class="text-white fw-bold text-capitalize ">${contactData[i].name.split(" ")[0][0]}${contactData[i].name.split(" ")[1] ? contactData[i].name.split(" ")[1][0] : ""}</span>

                                        </div>
                                        <div class="contact-info2">
                                            <h3 class="my-1">${contactData[i].name}</h3>
                                            <div class="d-flex align-items-center gap-1">
                                                <span>${contactData[i].phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="iconn2 rounded-3"><i class="rounded-3 fa-solid fa-phone"></i></div>
                                </div>
                            </div>`
        }
    }
    emrgnCards += `</div>`

    if (count === 0) {
        document.getElementById("emrgnlist").innerHTML = `<div class="d-flex align-items-center justify-content-center p-3"><span>No emergency contacts</span></div>`
    } else {
        document.getElementById("emrgnlist").innerHTML = emrgnCards
    }
    document.getElementById("emrgnCount").textContent = count

}

function toggleFav(index) {
    contactData[index].fav = !contactData[index].fav
    localStorage.setItem("contactcontainer", JSON.stringify(contactData))
    displayContact()
    displayFavorites()
}
function toggleEmrgn(index) {
    contactData[index].emrgnc = !contactData[index].emrgnc
    localStorage.setItem("contactcontainer", JSON.stringify(contactData))
    displayContact()
    displayEmergency()
}