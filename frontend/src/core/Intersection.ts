export default function CardHeaderIntersectionObserver() {
    const headerList: NodeList = document.querySelectorAll('.card__header')

    headerList.forEach((element: Node) => {
        const observer = new IntersectionObserver(
            ([e]) => e.target.classList.toggle("card__header--fixed", e.intersectionRatio < 1),
            { threshold: [1] }
        );
        
        observer.observe(element as Element);
    });
}
