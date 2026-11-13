// ========== НАВИГАЦИЯ ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ========== ВКЛАДКИ МИФОЛОГИИ ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.lore-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

// ========== ТЕСТ ==========
const questions = [
    {
        q: "Что для тебя важнее всего?",
        options: [
            { text: "Семья и защита близких", type: "stefan" },
            { text: "Страсть и свобода", type: "damon" },
            { text: "Хитрость и выживание", type: "katherine" },
            { text: "Магия и знания", type: "bonnie" }
        ]
    },
    {
        q: "Как ты реагируешь на предательство?",
        options: [
            { text: "Прощаю, но не забываю", type: "stefan" },
            { text: "Мщу жестоко и быстро", type: "damon" },
            { text: "Использую это в свою пользу", type: "katherine" },
            { text: "Ухожу в себя и анализирую", type: "bonnie" }
        ]
    },
    {
        q: "Твой идеальный вечер?",
        options: [
            { text: "Спокойный ужин с близкими", type: "stefan" },
            { text: "Бурная вечеринка с сюрпризами", type: "damon" },
            { text: "Планирование следующего шага", type: "katherine" },
            { text: "Чтение или изучение чего-то нового", type: "bonnie" }
        ]
    },
    {
        q: "Какая черта тебя описывает лучше всего?",
        options: [
            { text: "Благородство", type: "stefan" },
            { text: "Харизма", type: "damon" },
            { text: "Находчивость", type: "katherine" },
            { text: "Мудрость", type: "bonnie" }
        ]
    },
    {
        q: "Что бы ты выбрал?",
        options: [
            { text: "Вечную любовь", type: "stefan" },
            { text: "Вечную свободу", type: "damon" },
            { text: "Вечную жизнь", type: "katherine" },
            { text: "Вечную силу", type: "bonnie" }
        ]
    }
];

const results = {
    stefan: {
        icon: "🌹",
        name: "Стефан Сальваторе",
        desc: "Ты — благородный герой с темным прошлым. Для тебя важнее всего семья и принципы. Ты готов пожертвовать всем ради тех, кого любишь. Твоя сила — в человечности."
    },
    damon: {
        icon: "🥃",
        name: "Дэймон Сальваторе",
        desc: "Ты — харизматичный бунтарь с золотым сердцем. Дерзкий, саркастичный, но способный на великую любовь. Ты живешь моментом и не боишься идти против правил."
    },
    katherine: {
        icon: "👑",
        name: "Кэтрин Пирс",
        desc: "Ты — королева выживания. Хитрая, находчивая, всегда на шаг впереди. Ты знаешь, чего хочешь, и идешь к этому любой ценой. Твоя сила — в уме и характере."
    },
    bonnie: {
        icon: "🔮",
        name: "Бонни Беннет",
        desc: "Ты — верный друг с огромной внутренней силой. Мудрая, спокойная, но готовая сражаться за близких. Ты — та, на кого все полагаются в трудную минуту."
    }
};

let currentQuestion = 0;
let answers = { stefan: 0, damon: 0, katherine: 0, bonnie: 0 };

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = q.q;
    document.getElementById('progressBar').style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => selectAnswer(opt.type);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(type) {
    answers[type]++;
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let maxType = 'stefan';
    let maxCount = 0;
    for (let type in answers) {
        if (answers[type] > maxCount) {
            maxCount = answers[type];
            maxType = type;
        }
    }
    
    const result = results[maxType];
    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultName').textContent = result.name;
    document.getElementById('resultDesc').textContent = result.desc;
    
    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('resultCard').classList.remove('hidden');
}

function restartQuiz() {
    currentQuestion = 0;
    answers = { stefan: 0, damon: 0, katherine: 0, bonnie: 0 };
    document.getElementById('quizCard').classList.remove('hidden');
    document.getElementById('resultCard').classList.add('hidden');
    loadQuestion();
}

// Запуск теста
loadQuestion();