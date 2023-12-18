const saveButton = document.getElementById("saveButton");
        const textInput = document.getElementById("textInput");
        const outputDiv = document.getElementById("outputDiv");
        
        let editingText = null;

        saveButton.addEventListener("click", function() {
            const text = textInput.value;
            if (text.trim() !== "") {
                textInput.value = "";

                const textElement = document.createElement("div");
                textElement.classList.add("my-2");
                textElement.innerHTML = `
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2" id="checkbox">
                        <span class="editable-text">${text}</span>
                        <button class="ml-2 px-2 py-1 bg-red-500 text-white rounded" id="removeButton">Remove</button>
                    </div>
                `;

                outputDiv.appendChild(textElement);

                const removeButton = textElement.querySelector("#removeButton");
                const editableText = textElement.querySelector(".editable-text");

                removeButton.addEventListener("click", function() {
                    textElement.remove();
                });

                editableText.addEventListener("click", function() {
                    if (editingText) {
                        // Save previous editing text
                        editingText.contentEditable = "false";
                        editingText.querySelector("#editButton").textContent = "Edit";
                    }

                    // Enable editing for this text
                    editableText.contentEditable = "true";
                    editableText.focus();

                    // if (!editableText.querySelector("#saveButton")) {
                    //     // Add "Save" button
                    //     const saveButton = document.createElement("button");
                    //     saveButton.textContent = "Save";
                    //     saveButton.className = "ml-2 px-2 py-1 bg-blue-500 text-white rounded";
                    //     saveButton.id = "saveButton";
                    //     textElement.appendChild(saveButton);

                    //     saveButton.addEventListener("click", function() {
                    //         // Save the edited text
                    //         editableText.contentEditable = "false";
                    //         saveButton.remove();
                    //     });
                    // }

                    // Hide "Edit" button
                    // editableText.querySelector("#editButton").style.display = "none";

                    // Set this text as the currently editing text
                    // editingText = editableText;
                });
            }
        });

        outputDiv.addEventListener("click", function(event) {
            if (event.target.classList.contains("editable-text")) {
                if (editingText) {
                    // Save previous editing text
                    editingText.contentEditable = "false";
                    const editButton = editingText.querySelector("#editButton");
                    if (editButton) {
                        editButton.textContent = "Edit";
                    }
                }

                // Enable editing for this text
                event.target.contentEditable = "true";
                event.target.focus();

                if (!event.target.querySelector("#saveButton")) {
                    // Add "Save" button
                    const saveButton = document.createElement("button");
                    saveButton.textContent = "Save";
                    saveButton.className = "ml-2 px-2 py-1 bg-blue-500 text-white rounded";
                    saveButton.id = "saveButton";
                    event.target.appendChild(saveButton);

                    saveButton.addEventListener("click", function() {
                        // Save the edited text
                        event.target.contentEditable = "false";
                        saveButton.remove();
                    });
                }

                // // Hide "Edit" button
                const editButton = event.target.querySelector("#editButton");
                if (editButton) {
                    editButton.style.display = "none";
                }

                // Set this text as the currently editing text
                editingText = event.target;
            }
        });

        saveButton.addEventListener('click', function () {
            const text = textInput.value;
            if (text.trim() !== '') {
                textInput.value = '';
        
                // Send the text data to the backend
                fetch('/saveText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.message);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        });
        
        // saveButton.addEventListener('click', function () {
        //     // ... (your existing save logic)
        
        //     // After saving, refresh the displayed data
        //     fetchDataAndDisplay();
        // });
        

// Function to fetch and display data
// function fetchDataAndDisplay() {
//     fetch('/getText')
//         .then((response) => response.json())
//         .then((data) => {
//             outputDiv.innerHTML = ''; // Clear the existing content
//             data.forEach((text) => {
//                 const textElement = document.createElement('div');
//                 textElement.classList.add('my-2');
//                 textElement.textContent = text.text;
//                 outputDiv.appendChild(textElement);
//             });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }

// // Call the function to initially load the data
// fetchDataAndDisplay();
