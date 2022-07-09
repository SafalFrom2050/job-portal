export function ucfirst(str: string) {
    const firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}

export function formatCurrency($amount?: string) {
    return Intl.NumberFormat('en-IN').format(Number.parseInt($amount || '0'));
}

export function smoothScrollTop() {
    window.scrollTo({top: 0, behavior: "smooth"})
}

export function isMobileDisplay(){
    const x = window.matchMedia("(max-width: 700px)")
    return x.matches
}