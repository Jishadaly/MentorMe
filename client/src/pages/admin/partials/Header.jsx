import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center hover:text-indigo-500">Pages</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center hover:text-indigo-500">Blocks</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center hover:text-indigo-500">Docs</a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center hover:text-indigo-500">Account</a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 px-4 py-2 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Typography as="a" href="#" variant="h5" className="mr-4 py-1.5 font-bold">
          MentorME
        </Typography>
        <div className="hidden lg:flex items-center gap-6">
          {navList}
          <Button variant="gradient" size="sm">
            <span>Contact Us</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <FiX size={24} /> : <FiMenu size={24} />}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Contact Us</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Header;
