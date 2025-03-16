//.env
const apikey = process.env.API_KEY;
const html = process.env.HTTP;
const title = process.env.TITLE;

const footer = document.querySelector("footer");

const btnPush = document.createElement("button");
btnPush.innerHTML = "Push";
btnPush.setAttribute("id", "sendMessage");
btnPush.onclick = sendMessage;
document.body.appendChild(btnPush);
footer.appendChild(btnPush);

const btnPull = document.createElement("button");
btnPull.innerHTML = "Pull";
btnPull.setAttribute("id", "toggleResponse");
btnPull.onclick = toggleResponse;
document.body.appendChild(btnPull);
footer.appendChild(btnPull);

const responseDiv = document.createElement("div");
responseDiv.setAttribute("id", "response");
responseDiv.style.display = "none";
document.body.appendChild(responseDiv);
footer.appendChild(responseDiv);

//função toggleResponse realizado junto a IA
function toggleResponse() {
    const responseDiv = document.getElementById('response');
    if (responseDiv.style.display === "none") {
        responseDiv.style.display = "block";
    } else {
        responseDiv.style.display = "none";
    }
}

//Implementação da API
async function sendMessage() {
    const input = document.body.innerText;
    const responseDiv = document.getElementById('response');
    if (!btnPush) {
        responseDiv.innerHTML = 'W';
        return;
    }
    responseDiv.innerHTML = 'Loading...';
    try {
        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer apikey',
                    'HTTP-Referer': 'html',
                    'X-Title': 'title',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-r1:free',
                    messages: [{ role: 'user', content: 'Responda as questoes relacionadas a DataBase: ' + input }],
                }),
            },
        );
        const data = await response.json();
        console.log(data);
        const messageContent =
            data.choices?.[0]?.message?.content || 'No response received.';
        responseDiv.innerHTML = messageContent;
    } catch (error) {
        //Verificação necessaria...
        responseDiv.innerHTML = 'Error: ' + error.message;
    }
}