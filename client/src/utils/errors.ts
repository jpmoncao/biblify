export function foundErrorCode(errorCode: string): string {
    switch (errorCode) {
        case 'version_not_found':
            return 'Versão não encontrada ou indisponível';
        case 'book_not_found':
            return 'Livro não encontrado ou indisponível';
        case 'onload_verses_error':
            return 'Erro ao carregar versículos';
        default:
            return 'Erro inesperado no servidor!';
    }
}