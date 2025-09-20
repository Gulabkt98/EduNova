import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogMobileOpen, setCatalogMobileOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("category data:", res.data);
        // Correct way to access categories array from API response
        if (
          res?.data?.data?.allCategories &&
          Array.isArray(res.data.data.allCategories)
        ) {
          setSubLinks(res.data.data.allCategories);
        } else {
          setSubLinks([]);
          console.warn("Categories API returned unexpected data format.");
        }
      } catch (error) {
        console.error("Could not fetch Categories.", error);
        setSubLinks([]);
      }
      setLoading(false);
    })();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCatalogMobileOpen(false);
  }, [location.pathname]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[2.8em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.5em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks
                          .filter((subLink) => subLink?.name)
                          .map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth / Cart */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-richblack-100"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <AiOutlineClose fontSize={24} /> : <AiOutlineMenu fontSize={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 bottom-0 z-40 bg-richblack-900/95 backdrop-blur-md overflow-y-auto md:hidden">
          <nav className="flex flex-col gap-y-2 p-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between rounded-lg bg-richblack-800 px-4 py-3 text-left"
                      onClick={() => setCatalogMobileOpen((prev) => !prev)}
                      aria-expanded={catalogMobileOpen}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown className={`transition-transform ${catalogMobileOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {catalogMobileOpen && (
                      <div className="mt-2 flex flex-col gap-y-1 px-4">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks.length > 0 ? (
                          subLinks
                            .filter((subLink) => subLink?.name) ////this is not complete it should have course name
                            .map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="rounded-lg bg-richblack-700 px-4 py-2 hover:bg-richblack-600"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setCatalogMobileOpen(false);
                                }}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="block rounded-lg bg-richblack-800 px-4 py-3 hover:bg-richblack-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth and Cart */}
            <div className="mt-4 flex flex-col gap-y-2">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="relative flex items-center gap-2 rounded-lg bg-richblack-800 px-4 py-3 hover:bg-richblack-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute top-2 right-6 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-100">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
