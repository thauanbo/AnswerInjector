//.env
const apikey = process.env.API_KEY;
const html = process.env.HTTP;
const title = process.env.TITLE;

const footer = document.querySelector("footer");

const btnPush = document.createElement("button");
btnPush.innerHTML = "Push";
btnPush.setAttribute("id", "sendMessage");
btnPush.onclick = processQuestions;
document.body.appendChild(btnPush);
footer.appendChild(btnPush);

async function processQuestions() {
    const form = document.querySelector('form');
    const elementosQuestion = form.querySelectorAll('[id^="question"]');

    if (elementosQuestion.length > 0) {
        const questions = [];

        elementosQuestion.forEach((elemento, index) => {
            const primeiraClasse = elemento.classList[0];
            const inicial = primeiraClasse ? primeiraClasse.charAt(0) : 'Sem classe';
            const questionText = elemento.innerText.trim();

            questions.push({
                id: elemento.id,
                elemento: elemento,
                primeiraLetraClasse: inicial,
                questionText: questionText
            });
        });

        //Implementação para indexar todas as questões para API
        const input = questions.map((q, index) => `${index + 1} = ${q.questionText}`).join('\n');

        await sendMessage(input, questions);
        //avaliação real, ainda a ser realizado em testes...
    } else {
        console.log('Nenhum elemento com ID começando com "question" foi encontrado.');
    }
}
//Implementação da API
async function sendMessage(input, questions) {
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
                    messages: [{ role: 'user', content: 'Responda as questões, quero somente as respostas seguindo o exemplo: 1 = a\n caso a resposta tenho multiplas acertivas trazer todas juntas somente com a inicial da resposta como : 1 = m/m/m/ e nao como : 1= max/min/mult' + input }],
                }),
            },
        );
        const data = await response.json();
        const messageContent = data.choices?.[0]?.message?.content || 'No response received.';

        // Realiza inserção dupla na div
        const answers = messageContent.split('\n');
        questions.forEach((q, index) => {
            const infoDiv = q.elemento.querySelector('.info');
            const noDiv = infoDiv ? infoDiv.querySelector('.no') : null;

            if (noDiv && answers[index]) {
                noDiv.innerHTML += `<div class="resposta">${answers[index]}</div>`;
            }
        });
    } catch (error) {
        //Verificação necessaria...
        console.error('Error:', error);

    }
}
