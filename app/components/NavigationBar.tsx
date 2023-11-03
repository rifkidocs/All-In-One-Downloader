"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: string[] = ["Features", "About"];

  return (
    <Navbar
      classNames={{ wrapper: "max-w-full xl:px-56 lg:px-10 px-4" }}
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className='sm:hidden'
        />
        <NavbarBrand>
          <p className='font-bold text-inherit '>TikTok Downloader</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#' color='foreground'>
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Popover placement='bottom' showArrow={true}>
            <PopoverTrigger>
              <Button as={Link} color='primary' href='#' variant='flat'>
                Contact
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='px-1 py-2'>
                <div className='text-small font-bold'>Social Media</div>
                <div>
                  <Link
                    href='https://instagram.com/rifkithears'
                    className='text-small'>
                    Instagram
                  </Link>
                </div>
                <div>
                  <Link
                    href='https://github.com/rifkidocs'
                    className='text-small'>
                    Github
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color='foreground' className='w-full' href='#' size='lg'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
