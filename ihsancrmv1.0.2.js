function ihsanCRM(nameDiv, obj) {
  const newDiv = document.createElement("div");
  newDiv.id = nameDiv;
  document.body.appendChild(newDiv);

  sessionStorage.setItem("AUTHTOKENIH", obj.token);
  sessionStorage.setItem("AUTHDIVIH", nameDiv);

  if (document.getElementById(nameDiv)) {
    let buttonOfIhsanDiv = `<a class="formModal_btn"><img src="https://webai.ihsancrm.com/public/web/message-logo.svg" alt="" style="width: 35px;"></a>    <div  class="ihsanAi-modal" >
<div class="content"> hi </div></div>`;
    document.getElementById(nameDiv).innerHTML = buttonOfIhsanDiv;

    console.log("Bot is initialized");
    const formData = {
      name: "name",
      email: "test@gmail.com",
      token: obj.token,
    };
    console.log(formData);
    // Convert the data object to JSON
    const jsonData = JSON.stringify(formData);

    fetch("https://webai.ihsancrm.com/api/web/instance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // let responseData = JSON.parse(data);
        console.log(data.status);

        if (data.status == 200) {
          let chatMsg = getCHATBrows(
            data.name,
            data.message,
            data.logo,
            nameDiv
          );
          sessionStorage.setItem("AUTHCLRIH", data.color);
          document.querySelector(
            "#ihsanCRMWebAi>.ihsanAi-modal>.content"
          ).innerHTML = chatMsg;
          // document.getElementById(nameDiv).innerHTML =chatMsg;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Form Modal show data⭐

    document.addEventListener("DOMContentLoaded", function () {
      // Add a click event listener to the formModalBtn link
      if (document.querySelector(".formModal_btn")) {
        document
          .querySelector(".formModal_btn")
          .addEventListener("click", function (event) {
            let formModalDiv = document.querySelector(".ihsanAi-modal");
            event.preventDefault(); // Prevent the link from navigating

            // Toggle the visibility of the form_modal div
            if (formModalDiv.style.display === "none") {
              formModalDiv.style.display = "block";
            } else {
              formModalDiv.style.display = "none";
            }
          });
      }

      // Add a click event listener to the close link
      document
        .querySelector(".closeModalBtn")
        .addEventListener("click", function (event) {
          event.preventDefault();
          let formModalDiv = document.querySelector(".ihsanAi-modal");
          formModalDiv.style.display = "none";
        });
    });
  } else {
    console.log("The div does not exist.");
  }
}

function getCHATBrows(name, question, logo, nameDiv) {
  return (
    `
    <div class="top-content">
        <div>
             <img src="https://webai.ihsancrm.com/public/web/chat-image.svg" alt="not-Show"/>
        </div>
        <div style="padding-left: 20px;">
            <h2>` +
    name +
    `</h2>
            <p>Powered By <span>IHSAN AI</span></p>
        </div>
    </div>
    <div style="height: 360px; background-color: rgb(245, 245, 249); margin: 0px 26px;">
        <div class="chat-content scrollbar">
            <div class="left-div">
                <div class="chat-bubble">
                    <p>` +
    question +
    `
                       
                    </p>
                </div>

            </div>

        
        </div>

    </div>
    <div style="background-color:white;">
        <form  id='` +
    nameDiv +
    `_Form'>
            <div style="display: flex; justify-content: center; padding: 10px 0px;">
                <textarea class="type_message scrollbar" name=""
                    placeholder="Type your message here..."></textarea>
                <button onclick="ihsanCRMWebAiForm()" class="send-message" type="button"><img src="https://webai.ihsancrm.com/public/web/send-msg.svg" alt=""></button>
            </div>
        </form>
    </div>

    <a href="javascript:void(0)"  onclick='closeTabsofModal()' class="closeModalBtn"><i class="fa fa-times fa-1x" aria-hidden="true"></i></a>
`
  );
}

function postMessageToUser(status, message, isBot, nameDiv) {
  const existingDiv = document.querySelector(
    "#" + nameDiv + ">.ihsanAi-modal>.content>div>.chat-content"
  );

  // Create a new div element with the class "left-div"
  const newDiv = document.createElement("div");
  if (isBot === 0) {
    newDiv.classList.add("right-div");
  } else {
    newDiv.classList.add("left-div");
  }

  // Create the inner structure (chat bubble and paragraph)
  const chatBubbleDiv = document.createElement("div");
  chatBubbleDiv.classList.add("chat-bubble");
  if (isBot === 0) {
    chatBubbleDiv.style.backgroundColor = sessionStorage.getItem("AUTHCLRIH");
  }

  if (status === 500 && isBot === 1) {
    chatBubbleDiv.style.backgroundColor = "#FC0000";
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = message; // Replace with your question variable

  // Append the paragraph inside the chat bubble div
  chatBubbleDiv.appendChild(paragraph);

  // Append the chat bubble div inside the new div
  newDiv.appendChild(chatBubbleDiv);

  // Append the new div into the existing div
  existingDiv.appendChild(newDiv);
}

function closeTabsofModal() {
  if (document.querySelector(".ihsanAi-modal")) {
    document.querySelector(".ihsanAi-modal").style.display = "none";
  }
}

function ihsanCRMWebAiForm() {
  if (sessionStorage.getItem("AUTHTOKENIH")) {
    // Variable is initialized

    // Create a data object with the form data
    let messagetobesned = document.querySelector(
      "#" + sessionStorage.getItem("AUTHDIVIH") + "_Form>div>textarea"
    );

    // Convert the data object to JSON
    if (messagetobesned.value !== "") {
      document.querySelector(
        "#" + sessionStorage.getItem("AUTHDIVIH") + "_Form>div>button"
      ).disabled = true;

      const formData = {
        message: messagetobesned.value,
        token: sessionStorage.getItem("AUTHTOKENIH"),
      };
      const jsonData = JSON.stringify(formData);
      postMessageToUser(
        200,
        messagetobesned.value,
        0,
        sessionStorage.getItem("AUTHDIVIH")
      );
      messagetobesned.value = "";
      // Make a POST request to your API
      fetch("https://webai.ihsancrm.com/api/web/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          // let responseData = JSON.parse(data);

          document.querySelector(
            "#" + sessionStorage.getItem("AUTHDIVIH") + "_Form>div>button"
          ).disabled = false;

          postMessageToUser(
            data.status,
            data.message,
            1,
            sessionStorage.getItem("AUTHDIVIH")
          );
        })
        .catch((error) => {
          document.querySelector(
            "#" + sessionStorage.getItem("AUTHDIVIH") + "_Form>div>button"
          ).disabled = false;
          console.error("Error:", error);
        });
    }
  }
}
