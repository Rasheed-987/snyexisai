import Link from 'next/link';
import Button from '@/components/ui/Button';

export const Navigation = () => {
  return (
    <nav className="w-full h-[68px] border-b border-border bg-background">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center mt-[9px]">
          <img 
            src="/images/logo.png" 
            alt="Synexis Ai" 
            className="w-[206px] h-[50px] object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center border-2  border-emerald-400 gap-8">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors tracking-[0.57px] leading-[34.19px]"
          >
            HOME
          </Link>
          
          <Link
            href="#"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-[0.57px] leading-[34.19px]"
          >
            ABOUT
          </Link>
          
          <Link
            href="#"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-[0.57px] leading-[34.19px]"
          >
            SERVICES
          </Link>
          
          <Link
            href="#"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-[0.57px] leading-[34.19px]"
          >
            CASE STUDIES
          </Link>
          
          <Link
            href="/careers"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-[0.57px] leading-[34.19px]"
          >
            CAREER
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3" style={{ marginTop: '10px' }}>
          <Button 
            variant="nav-outline"
            size="nav-menu"
            className="hidden md:flex"
          
          >
            Menu
          </Button>
          
          <Button 
            variant="nav-primary"
            size="nav-cta"
            
          >
            Let's Talk
          </Button>
        </div>
      </div>
    </nav>
  );
};

