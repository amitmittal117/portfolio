import { profile } from '../../data';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t">
            <div className="container">
                <p className="text-sm text-muted-foreground text-center">
                    © {currentYear} {profile.name}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
