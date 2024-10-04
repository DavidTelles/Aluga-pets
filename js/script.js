function toggleOptions(optionId) {
    var options = document.getElementById(optionId);
    // Fechar todas as outras opções
    var allOptions = document.querySelectorAll('.options');
    allOptions.forEach(option => {
        if (option.id !== optionId) {
            option.style.display = 'none';
        }
    });

    // Alternar a exibição da opção clicada
    if (options.style.display === 'block') {
        options.style.display = 'none';
    } else {
        options.style.display = 'block';
    }
}

// Objeto que mantém os filtros selecionados
var filters = {
    raca: 'Todos',
    idade: 'Todos',
    genero: 'Todos',
    adotado: 'Todos',
    doenca: 'Todos'
};

// Função para selecionar uma opção e atualizar os filtros
function selectOption(filterType, value) {
    // Atualiza o filtro selecionado
    filters[filterType] = value;

    // Atualiza os cards conforme os filtros
    updatePetCards();

    // Atualiza a exibição dos filtros ativos
    updateActiveFilters();

    // Esconde as opções após a seleção
    var optionsId = filterType + 'Options';
    document.getElementById(optionsId).style.display = 'none';
}

// Função que atualiza a exibição dos cards conforme os filtros aplicados
function updatePetCards() {
    // Pega todos os elementos de cards
    var cards = document.getElementsByClassName('card');

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];

        // Recupera os atributos do card
        var raca = card.getAttribute('data-raca');
        var idade = card.getAttribute('data-idade');
        var genero = card.getAttribute('data-genero');
        var adotado = card.getAttribute('data-adotado');
        var doenca = card.getAttribute('data-doenca');

        // Verifica se o card corresponde aos filtros
        var showCard = true;

        if (filters.raca !== 'Todos' && filters.raca !== raca) {
            showCard = false;
        }

        if (filters.idade !== 'Todos' && filters.idade !== idade) {
            showCard = false;
        }

        if (filters.genero !== 'Todos' && filters.genero !== genero) {
            showCard = false;
        }

        if (filters.adotado !== 'Todos' && filters.adotado !== adotado) {
            showCard = false;
        }

        if (filters.doenca !== 'Todos' && filters.doenca !== doenca) {
            showCard = false;
        }

        // Exibe ou oculta o card conforme o filtro
        if (showCard) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

// Função para atualizar a exibição dos filtros ativos
function updateActiveFilters() {
    var activeFiltersList = document.getElementById('activeFiltersList');
    var activeFiltersText = [];

    for (var key in filters) {
        if (filters[key] !== 'Todos') {
            activeFiltersText.push(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + filters[key]);
        }
    }

    if (activeFiltersText.length === 0) {
        activeFiltersList.innerText = 'Nenhum filtro aplicado.';
    } else {
        activeFiltersList.innerText = activeFiltersText.join(', ');
    }
}

// Função para limpar os filtros e restaurar a exibição padrão
function limparFiltros() {
    // Reseta o objeto de filtros
    filters = {
        raca: 'Todos',
        idade: 'Todos',
        genero: 'Todos',
        adotado: 'Todos',
        doenca: 'Todos'
    };

    // Seleciona todas as cartas de pets e exibe todas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Restaura a seleção visual para "Todos" em cada menu de opções
    document.querySelectorAll('.options').forEach(optionMenu => {
        const options = optionMenu.querySelectorAll('p');
        options.forEach(option => {
            if (option.innerText === 'Todos') {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    });

    // Fechar os menus dropdown, se necessário
    document.querySelectorAll('.options').forEach(optionsDiv => {
        optionsDiv.style.display = 'none';
    });

    // Atualiza os cards para exibir todos (já que os filtros foram resetados)
    updatePetCards();

    // Atualiza a exibição dos filtros ativos
    updateActiveFilters();
}

let currentSlide = 0;

function showSlide(index) {
const slides = document.querySelectorAll('.carousel-item');
if (index >= slides.length) {
currentSlide = 0; // Retorna ao primeiro slide
} else if (index < 0) {
currentSlide = slides.length - 1; // Vai para o último slide
} else {
currentSlide = index;
}
// Move o carrossel
const carouselInner = document.querySelector('.carousel-inner');
carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Função para mover os slides
function moveSlide(direction) {
showSlide(currentSlide + direction);
}

// Inicia o carrossel
showSlide(currentSlide);

function showSlide(index) {
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator'); // Seleciona todos os indicadores

if (index >= slides.length) {
currentSlide = 0; // Retorna ao primeiro slide
} else if (index < 0) {
currentSlide = slides.length - 1; // Vai para o último slide
} else {
currentSlide = index;
}

const carouselInner = document.querySelector('.carousel-inner');
carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

indicators.forEach((indicator, idx) => {
indicator.classList.toggle('active', idx === currentSlide);
});
}

// Função para alternar o estado de favorito e atualizar a interface
function toggleFavorito(id) {
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Verifica se o pet já está nos favoritos
if (favoritos.includes(id)) {
// Se sim, remove dos favoritos
favoritos = favoritos.filter(fav => fav !== id);
} else {
// Caso contrário, adiciona aos favoritos
favoritos.push(id);
}

// Atualiza o localStorage
localStorage.setItem('favoritos', JSON.stringify(favoritos));

// Atualiza os ícones e a lista de favoritos
atualizarIconesFavoritos();
exibirFavoritos();
}

// Função para atualizar os ícones de coração dos pets
function atualizarIconesFavoritos() {
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

document.querySelectorAll('.card').forEach(card => {
const id = card.getAttribute('data-id');
const buttonIcon = card.querySelector('button ion-icon');

// Verifica se o pet está nos favoritos e ajusta o ícone
if (favoritos.includes(id)) {
    buttonIcon.setAttribute('name', 'heart');  // Ícone de coração cheio
} else {
    buttonIcon.setAttribute('name', 'heart-outline');  // Ícone de coração vazio
}
});
}

// Função para exibir a lista de pets favoritados
function exibirFavoritos() {
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const favoritosContainer = document.getElementById('favoritos-container');
favoritosContainer.innerHTML = '';  // Limpa o container de favoritos

if (favoritos.length === 0) {
favoritosContainer.innerHTML = '<p>Nenhum pet foi favoritado ainda.</p>';
} else {
// Para cada pet favoritado, clona e exibe o card na seção de favoritos
favoritos.forEach(id => {
    const cardFavorito = document.querySelector(`.card[data-id="${id}"]`);
    if (cardFavorito) {
        const cardClone = cardFavorito.cloneNode(true);
        favoritosContainer.appendChild(cardClone);
    }
});
}
}

document.addEventListener('DOMContentLoaded', () => {
atualizarIconesFavoritos();
exibirFavoritos();
});

function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}