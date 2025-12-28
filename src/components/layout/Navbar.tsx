import {BookOpenIcon, InfoIcon, LifeBuoyIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import profileLogo from "@/assets/images/demo-profile-logo.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Logo from "@/assets/icons/Logo";
import {Link} from "react-router";
import {ModeToggle} from "./ModeToggle";
import {useGetProfileQuery} from "@/redux/features/auth/auth.api";
import {role} from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  {href: "/", label: "Home", role: role.public},
  {href: "/admin", label: "Dashboard", role: role.admin},
  {href: "/super-admin", label: "Dashboard", role: role.superAdmin},
  {href: "/sender", label: "Dashboard", role: role.sender},
  {href: "/receiver", label: "Dashboard", role: role.receiver},
  // { href: "/", label: "Pricing", role: role.public },
  {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      {href: "/get-us", label: "Getting Started", icon: "BookOpenIcon"},
      {href: "/contact-us", label: "Contact Us", icon: "LifeBuoyIcon"},
      {href: "/about-us", label: "About Us", icon: "InfoIcon"},
    ],
    role: role.public,
  },
];

export default function Navbar() {
  const {data: profile, isLoading} = useGetProfileQuery(undefined);

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-secondary">
      <div className="flex h-16 items-center justify-between gap-4 container mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <Logo></Logo>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {link?.role === profile?.data?.role && !link.submenu && (
                        <NavigationMenuItem className="w-full">
                          <NavigationMenuLink href={link.href} className="py-1.5">
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </div>
                  ))}

                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {link.role === role.public && (
                        <NavigationMenuItem className="w-full">
                          {link.submenu ? (
                            <>
                              <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{link.label}</div>
                              <ul>
                                {link.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink asChild className="py-1.5">
                                      <Link to={item.href}> {item.label}</Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <NavigationMenuLink href={link.href} className="py-1.5">
                              {link.label}
                            </NavigationMenuLink>
                          )}

                          {index < navigationLinks.length - 1 &&
                            ((!link.submenu && navigationLinks[index + 1].submenu) ||
                              (link.submenu && !navigationLinks[index + 1].submenu) ||
                              (link.submenu && navigationLinks[index + 1].submenu && link.type !== navigationLinks[index + 1].type)) && (
                              <div role="separator" aria-orientation="horizontal" className="bg-border -mx-1 my-1 h-px w-full" />
                            )}
                        </NavigationMenuItem>
                      )}
                    </div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            {/* Navigation menu */}
            <NavigationMenu viewport={false} className="max-md:hidden">
              <Link to="/" className="text-primary hover:text-primary/90">
                <Logo />
              </Link>

              <NavigationMenuList>
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === profile?.data?.role && !link.submenu && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                          <Link to={link.href as string}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}

                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === role.public && (
                      <NavigationMenuItem>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                              <ul className={cn(link.type === "description" ? "min-w-64" : "min-w-48")}>
                                {link.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink asChild className="py-1.5">
                                      {/* Display icon if present */}
                                      <Link to={item.href}>
                                        {link.type === "icon" && "icon" in item && (
                                          <div className="flex items-center gap-2">
                                            {item.icon === "BookOpenIcon" && (
                                              <BookOpenIcon size={16} className="text-foreground opacity-60" aria-hidden="true" />
                                            )}
                                            {item.icon === "LifeBuoyIcon" && (
                                              <LifeBuoyIcon size={16} className="text-foreground opacity-60" aria-hidden="true" />
                                            )}
                                            {item.icon === "InfoIcon" && <InfoIcon size={16} className="text-foreground opacity-60" aria-hidden="true" />}
                                            <span>{item.label}</span>
                                          </div>
                                        )}

                                        {/* Display label with description if present */}
                                        {link.type === "description" && "description" in item ? (
                                          <div className="space-y-1">
                                            <div className="font-medium">{item.label}</div>
                                          </div>
                                        ) : (
                                          // Display simple label if not icon or description type
                                          !link.type || (link.type !== "icon" && link.type !== "description" && <span>{item.label}</span>)
                                        )}
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                            <Link to={link.href as string}>{link.label}</Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle></ModeToggle>
          {!isLoading && !profile?.data?.email && (
            <Button asChild variant="link" size="sm" className="text-sm">
              <Link to="/login" className="">
                Sign In
              </Link>
            </Button>
          )}

          {!isLoading && profile?.data?.email && (
            <Button asChild variant="link" size="sm" className="text-sm">
              <Link to="/profile" className="">
                <img src={profileLogo} className="h-8 rounded-full" alt="" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
