const fullName = document.getElementById("full_name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const submitButton = document.getElementById("btn_submit");
const body = document.getElementById("body");
const inputForm = document.getElementById("input_form");
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const preview = document.getElementById("preview");

let ticketId = Math.floor(10000 + Math.random() * 90000);

    const { jsPDF } = window.jspdf;

    // Function to generate PDF and send via EmailJS
    function generatePDF() {
        const doc = new jsPDF();
        const emailTemplate = document.getElementById("ticket");

        // Generate PDF from the HTML content
        doc.html(emailTemplate, {
            callback: function (doc) {
                // Convert the PDF to a blob (binary data)
                const pdfBlob = doc.output("blob");

                // Use FileReader to convert the PDF blob to Base64
                const reader = new FileReader();
                reader.onloadend = function () {
                    const base64PDF = reader.result.split(",")[1];  // Get the Base64 part

                    // Send the email with the Base64 PDF as an attachment
                    sendEmailWithAttachment(base64PDF);
                };

                // Read the PDF blob as Base64
                reader.readAsDataURL(pdfBlob);
            },
            margin: [10, 10, 10, 10],
            x: 10,
            y: 10
        });
    }

    // Function to send the email with the PDF attachment
    function sendEmailWithAttachment(base64PDF) {
        emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
            name: fullName.value,
            email: email.value,
            user_name: username.value,
            ticket_id: ticketId,
            reply_to: fullName.value,
            support_email: "oluwatimilehinayo2004@gmail.com",
            current_year: new Date().getFullYear(),
            from_name: "Papa[Ojudun Ayomide Oluwatimilehin]...",
            attachments: [
                {
                    name: "ticket.pdf", // File name
                    data: base64PDF,    // Base64-encoded content
                    type: "application/pdf", // MIME type
                }
            ] // Attach the Base64 PDF like this
        },
        process.env.EMAILJS_PUBLIC_KEY
    )
        .then(function(response) {
            console.log("Email sent successfully", response);
        }, function(error) {
            console.error("Email sending failed", error);
        });
    }
    

    // Handle form submission
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const file = fileInput.files[0]; // Get the selected file
        let fileSrc = './assets/images/' + file.name;
        console.log(fileSrc);

        const profilePicsNew = fileSrc;
        console.log(profilePicsNew); // Use the preview image's src for the profile picture
        const emailNew = email.value;
        const usernameNew = username.value;
        const fullNameNew = fullName.value;
        
        // Replace the body content dynamically
                body.innerHTML = `class="p-4 border bg-mobile-background md:bg-tablet-background lg:bg-desktop-background bg-cover overflow-x-hidden font-[Inconsolata]">
            <div>
                <!-- first-circle pattern -->
                <img src="./assets/images/pattern-circle.svg"
                class="-z-10 fixed -top-5 -left-3 lg:left-10 w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="pattern-circle">
                <!-- second-circle pattern -->
                <img src="./assets/images/pattern-circle.svg"
                class="-z-10 fixed top-1/2 -right-4 lg:right-[30%] w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="pattern-circle">
                <!-- grid lines -->
                <div class="flex fixed -z-10">
                    <img src="./assets/images/pattern-lines.svg" class="w-[200vw] lg:h-[100vh] relative top-0" alt="pattern-lines">
                    <img src="./assets/images/pattern-lines.svg" class="w-[200vw] lg:h-[100vh] relative top-0" alt="pattern-lines">
                </div>
                <div class="bottom-0 -z-20 fixed lg:left-0">
                    <img 
                    class="w-[70%]"
                    src="./assets/images/pattern-squiggly-line-bottom.svg" alt="curly[ies]">
                </div>
                <div class="bottom-0 -z-20 absolute h-6 rotate-[180deg] top-28 right-0">
                    <img 
                    class="w-[40%] lg:w-[50%]"
                    src="./assets/images/pattern-squiggly-line-top.svg" alt="curly[ies]">
                </div>
            </div>
            <div id="ticket" class="w-full flex flex-col items-center text-white py-6 space-y-10">
                <div>
                    <img src="./assets/images/logo-full.svg" alt="logo">
                </div>
                <div class="text-center space-y-6">
                    <h1 class="text-xl lg:text-3xl font-extrabold">Congrats, <span class="bg-gradient-to-r from-orange-700 to-slate-100 bg-clip-text text-transparent rounded-sm">${fullNameNew}!</span><br> Your ticket is ready.</h1>
                    <p class="text-sm lg:text-lg font-light">We've emailed your ticket to <br><span class="text-orange-700">${emailNew}</span> and will send updates in <br>the run up to the event.</p>
                </div>
                <section>
                    <div class="relative p-4 w-[365px] lg:w-[410px] h-[200px] rounded-xl shadow-lg bg-cover bg-center flex flex-col justify-between" style="background-image: url('/assets/images/pattern-ticket.svg');">
                        <div>
                            <img src="./assets/images/logo-full.svg" alt="logo" class="text-start w-44">
                            <p class="pl-10 text-[12px]">Jan 31, 2025 / Austin, TX</p>
                        </div>
                        <aside class="relative">
                            <p class="text-center absolute -right-2 rotate-[90deg] opacity-20">#<span>${ticketId}</span></p>
                        </aside>
                        <div class="flex gap-2 items-center">
                            <img src="${profilePicsNew}" alt="profile_pics" class="w-14 rounded-lg" id="preview">
                            <div>
                                <h2>${fullNameNew}</h2>
                                <div class="flex ">
                                    <img class="pr-2" src="./assets/images/icon-github.svg" alt="github_logo">
                                    <p>${usernameNew}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>`;

        generatePDF(); // Convert the current UI to a PDF and send it
        sendEmailWithAttachment();
    });

    // Trigger file input when clicking the button
    uploadButton.addEventListener("click", () => {
        fileInput.click();
    });

    // Log file information and preview the image when a file is selected
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0]; // Get the selected file
            console.log("Selected file:", file.name, file.size, file.type);
            uploadButton.innerHTML = `<p>${file.name}<br> ${file.size} bytes</p>`;

            // Preview the uploaded file
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });



//     function testSendEmail() {
//         emailjs.send("service_nr5cj9l", "template_enm9zjd", {
//             name: "John Doe",
//             email: "oluwatimilehinayo2004@gmail.com",
//             message: "This is a test email"
//         })
//         .then(function(response) {
//             console.log("Email sent successfully!", response.status, response.text);
//         })
//         .catch(function(error) {
//             console.error("Failed to send email:", error);
//         });
//     }
    
// window.addEventListener('load', testSendEmail)