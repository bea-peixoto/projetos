const questions = [
    {
         question: "Em que ano o Clube de Regatas Vasco da Gama foi fundado?",
         answers: [
            { text: "1998", correct: false },
            { text: "1898", correct: true },
            { text: "1888", correct: false },
            { text: "2011", correct: false },
         ]
    },
    {
         question: "Quantas Libertadores tem o clube?",
         answers: [
            { text: "1", correct: true },
            { text: "3", correct: false },
            { text: "2", correct: false },
            { text: "nenhuma", correct: false },
         ]  
    },
    {
        question: "Qual é o nome da principal torcida organizada do Vasco da Gama?",
         answers: [
            { text: "Torcida Jovem", correct: false },
            { text: "Gaviões da Fiel", correct: false },
            { text: "Mancha Verde", correct: false },
            { text: "Força Jovem", correct: true },
         ]
    },
    {
        question: " Qual foi o maior goleador da história do Vasco da Gama?",
         answers: [
            { text: "Romário", correct: false },
            { text: "Roberto Dinamite", correct: true },
            { text: "Edmundo", correct: false },
            { text: "Gabriel Pec", correct: false },
         ]
    },
    {
        question: "O que representa a expressão A Resposta Histórica no contexto do Vasco da Gama?",
         answers: [
            { text: "A resposta do clube à exclusão dos negros do futebol brasileiro", correct: true },
            { text: "A resposta do clube à rivalidade com o Flamengo", correct: false },
            { text: "A resposta à crise financeira do clube na década de 1980", correct: false },
            { text: "A resposta à eliminação do Vasco em uma competição internacional", correct: false },
         ]
    },
    {
        question: "Qual foi a reação de outros clubes diante da postura inclusiva do Vasco da Gama na década de 1920?",
         answers: [
            { text: "Criticaram duramente o clube e tentaram afastá-lo das competições", correct: true },
            { text: "Outros clubes seguiram o exemplo do Vasco e adotaram políticas semelhantes", correct: false },
            { text: "Fizeram uma greve contra a contratação de jogadores negros", correct: false },
            { text: "Tentaram impedir o Vasco de jogar no Maracanã", correct: false },
         ]
    },
    {
        question: "Em que ano o Vasco da Gama foi campeão da Copa Mercosul?",
        answers: [
           { text: "1997", correct: false },
           { text: "2000", correct: false },
           { text: "2001", correct: true },
           { text: "2005", correct: false },
        ]
   },
    {
         question: "Em que ano o Vasco da Gama conquistou seu primeiro Campeonato Brasileiro?",
         answers: [
            { text: "1974", correct: true },
            { text: "1989", correct: false },
            { text: "1997", correct: false },
            { text: "2000", correct: false },
         ]
    },
    {
        question: "Quem foi o primeiro jogador negro a atuar pelo Vasco da Gama e também o primeiro a ser campeão carioca com o clube?",
        answers: [
           { text: "Paulinho", correct: false },
           { text: "Charles Miller", correct: false },
           { text: "Edmundo", correct: false },
           { text: "Manuel dos Santos", correct: true },
        ]
   },
    {
         question: "Em 1998, o Vasco da Gama foi campeão da Copa Libertadores. Quem foi o artilheiro da equipe nessa competição?",
         answers: [
            { text: "Romário", correct: false },
            { text: "Edmundo", correct: true },
            { text: "Juninho Pernambucano", correct: false },
            { text: "Vegetti", correct: false },
         ]
    }

];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    document.body.style.backgroundImage = "";
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion () {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
} 

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let message = `Você acertou ${score} de ${questions.length} perguntas!`;

    // Seleciona o elemento <body> para alterar o plano de fundo
    const body = document.body;

    // Define estilos para o body
    body.style.margin = "0"; // Remove margens
    body.style.padding = "0"; // Remove paddings
    body.style.display = "flex"; // Flexbox para centralizar
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.height = "100vh"; // Altura total da viewport
    body.style.backgroundSize = "cover"; // O GIF cobre toda a tela
    body.style.backgroundPosition = "center"; // Centraliza o GIF
    body.style.backgroundRepeat = "no-repeat"; // Evita repetição

    // Verifica a pontuação e altera o plano de fundo com o GIF correspondente
    if (score === questions.length) {
        body.style.backgroundImage = "url('./gifs/caze.gif')"; // Caminho do GIF feliz
    } else if (score === 0) {
        body.style.backgroundImage = "url('./gifs/triste.gif')"; // Caminho do GIF triste
    } else {
        body.style.backgroundImage = ""; // Remove o fundo caso seja pontuação parcial
        message = `Você acertou ${score} de ${questions.length} perguntas. Tente novamente!`;
    }

    // Exibe a mensagem acima do botão "Jogar novamente"
    questionElement.innerHTML = `<div style="background-color: rgba(0, 0, 0, 0.5); color: white; padding: 20px; border-radius: 10px; text-align: center;">${message}</div>`;
    nextButton.innerHTML = "Jogar novamente";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
});


startQuiz();