import Cookie from 'js-cookie';

interface IProps {
    children: React.ReactNode;
}

function CustomCenteredCell({ children }: IProps) {
    const currentLang = Cookie.get("Language") ?? "en";
    return (
        <p className="text-center" style={{ transform: currentLang === 'en' ? 'translate(-22.5%, 0)' : 'translate(22.5%, 0)' }} >{children}</p>
    )
}

export default CustomCenteredCell