(function() {
    "use strict";
    window.addEventListener("load", main);

    function main() {
        updateChat();
        $("send-chat").addEventListener("click", function(evt) {
            evt.preventDefault();
            sendChat();
        });
    }

    function updateChat(cids) {
        let params = new FormData();
        if (cids != null) {
            for (let i = 0; i < cids.length; i++) {
                params.append("cids[]", cids[i]);
            }
        }

        fetch("../api/chat-history.php", {method: "POST", body: params})
            .then(checkStatus)
            .then(resp => resp.json())
            .then(showChats)
            .catch(resubscribe);
    }

    function showChats(data) {
        $("chat-history").innerHTML = "";
        let cids = new Array();
        for (let i = data.length - 1; i >= 0; i--) {
            let msg = document.createElement("p");
            msg.id = data[i].cid;
            cids.push(data[i].cid);
            msg.innerText = data[i].username + ": \n" + data[i].message;
            $("chat-history").appendChild(msg);
        }

        updateChat(cids);
    }

    function sendChat() {
        let params = new FormData();
        params.append("username", username);
        params.append("message", $("chat-box").value);
        fetch("../api/send-message.php", {method: "POST", body: params}).catch(handleError);
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function handleError(error) {
        console.log(error);
    }

    function resubscribe(error) {
        console.log(error);
        updateChat();
    }
})();