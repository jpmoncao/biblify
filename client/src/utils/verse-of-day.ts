let verses = [
    { "abbrev": "jo", "name": "João", "chapter": 3, "number": 16, "text": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
    { "abbrev": "fp", "name": "Filipenses", "chapter": 4, "number": 13, "text": "Tudo posso naquele que me fortalece." },
    { "abbrev": "sl", "name": "Salmos", "chapter": 23, "number": 1, "text": "O Senhor é o meu pastor; nada me faltará." },
    { "abbrev": "rm", "name": "Romanos", "chapter": 8, "number": 28, "text": "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito." },
    { "abbrev": "is", "name": "Isaías", "chapter": 41, "number": 10, "text": "Não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortaleço e o ajudo; eu o sustento com a minha mão direita vitoriosa." },
    { "abbrev": "mt", "name": "Mateus", "chapter": 28, "number": 19, "text": "Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo." },
    { "abbrev": "sl", "name": "Salmos", "chapter": 46, "number": 1, "text": "Deus é o nosso refúgio e a nossa fortaleza, socorro bem presente na angústia." },
    { "abbrev": "jo", "name": "João", "chapter": 14, "number": 6, "text": "Respondeu-lhe Jesus: Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim." },
    { "abbrev": "2co", "name": "2 Coríntios", "chapter": 5, "number": 7, "text": "Pois vivemos por fé, e não pelo que vemos." },
    { "abbrev": "pv", "name": "Provérbios", "chapter": 3, "number": 5, "text": "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento." },
    { "abbrev": "gl", "name": "Gálatas", "chapter": 5, "number": 22, "text": "Mas o fruto do Espírito é: amor, alegria, paz, para pacificar, para a longanimidade, benignidade, bondade, fé." },
    { "abbrev": "ef", "name": "Efésios", "chapter": 6, "number": 10, "text": "Finalmente, fortaleçam-se no Senhor e na força do seu poder." },
    { "abbrev": "hb", "name": "Hebreus", "chapter": 11, "number": 1, "text": "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos." },
    { "abbrev": "fp", "name": "Filipenses", "chapter": 4, "number": 6, "text": "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplica, e com ações de graças, apresentem seus pedidos a Deus." },
    { "abbrev": "jo", "name": "João", "chapter": 16, "number": 33, "text": "Eu lhes disse essas coisas para que em mim vocês tenham paz. No mundo vocês terão aflições; mas tenham ânimo! Eu venci o mundo." },
    { "abbrev": "tg", "name": "Tiago", "chapter": 1, "number": 5, "text": "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e nada lhes será dito." },
    { "abbrev": "rm", "name": "Romanos", "chapter": 12, "number": 12, "text": "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração." },
    { "abbrev": "is", "name": "Isaías", "chapter": 40, "number": 31, "text": "Mas os que esperam no Senhor renovarão as suas forças. Subirão com asas como águias; correrão, e não se cansarão; andarão, e não se fatigarão." },
    { "abbrev": "sl", "name": "Salmos", "chapter": 119, "number": 105, "text": "Lâmpada para os meus pés é a tua palavra e luz para os meus caminhos." },
    { "abbrev": "rm", "name": "Romanos", "chapter": 15, "number": 13, "text": "Que o Deus da esperança os encha de toda alegria e paz à medida que confiam nele, para que vocês transbordem de esperança pelo poder do Espírito Santo." },
    { "abbrev": "mt", "name": "Mateus", "chapter": 7, "number": 7, "text": "Peçam, e lhes será dado; busquem, e encontrarão; batam, e a porta será aberta para vocês." },
    { "abbrev": "sf", "name": "Sofonias", "chapter": 2, "number": 3, "text": "Busquem o Senhor, todos vocês humildes do país, vocês que fazem o que ele ordena. Busquem a justiça, busquem a humildade; talvez vocês tenham abrigo no dia da ira do Senhor." },
    { "abbrev": "ef", "name": "Efésios", "chapter": 4, "number": 30, "text": "Não entristeçam o Espírito Santo de Deus, com o qual vocês foram selados para o dia da redenção." },
    { "abbrev": "js", "name": "Josué", "chapter": 21, "number": 45, "text": "De todas as boas promessas do Senhor à nação de Israel, nenhuma delas falhou; todas se cumpriram." },
    { "abbrev": "fp", "name": "Filipenses", "chapter": 3, "number": 15, "text": "Todos nós que alcançamos a maturidade devemos ver as coisas dessa forma, e se em algum aspecto vocês pensam de modo diferente, isso também Deus lhes esclarecerá." },
    { "abbrev": "ec", "name": "Eclesiastes", "chapter": 7, "number": 26, "text": "Descobri que muito mais amarga do que a morte é a mulher que serve de laço, cujo coração é uma armadilha e cujas mãos são correntes. O homem que agrada a Deus escapará dela, mas ao pecador ela apanhará." },
    { "abbrev": "1tm", "name": "1ª Timóteo", "chapter": 5, "number": 8, "text": "Se alguém não cuida de seus parentes, e especialmente dos de sua própria família, negou a fé e é pior que um descrente." },
    { "abbrev": "1jo", "name": "1ª João", "chapter": 1, "number": 4, "text": "Escrevemos estas coisas para que a nossa alegria seja completa." },
    { "abbrev": "at", "name": "Atos", "chapter": 1, "number": 8, "text": "Mas receberão poder quando o Espírito Santo descer sobre vocês, e serão minhas testemunhas em Jerusalém, em toda a Judéia e Samaria, e até os confins da terra" },
    { "abbrev": "fp", "name": "Filipenses", "chapter": 3, "number": 13, "text": "Irmãos, não penso que eu mesmo já o tenha alcançado, mas uma coisa faço: esquecendo-me das coisas que ficaram para trás e avançando para as que estão adiante, prossigo para o alvo, a fim de ganhar o prêmio do chamado celestial de Deus em Cristo Jesus." },
]

export function getVerseOfDay(date: number) {
    if (date > verses.length - 1)
        date = verses.length;
    return verses[date - 1]
}