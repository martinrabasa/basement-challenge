import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { useCart } from "../utils/Cart";
import logo from "../public/assets/logo.svg";
import logoSmall from "../public/assets/logo-small.svg";
import yourCart from "../public/assets/your-cart.svg";
import checkout from "../public/assets/checkout.svg";
import navIcons from "../public/assets/nav-icons.svg";
import header from "../public/assets/header.svg";

const Header = () => {
  const { cart, total, addToCart, removeFromCart } = useCart();

  return (
    <header className="p-4 md:p-7 mx-auto max-w-8xl">
      <div className="flex items-center justify-between w-full gap-4">
        <div>
          <Link className="hidden md:block" href="/">
            <Image alt="Basement" src={logo} />
          </Link>
          <Link className="block md:hidden" href="/">
            <Image alt="Basement" src={logoSmall} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <Image alt="" src={navIcons} />
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="border px-7 py-1 rounded-full ml-auto text-md md:text-lg md:ml-0 outline-none cursor-pointer">
            CART ({cart.length})
          </Dialog.Trigger>
          <Dialog.Overlay className="bg-black fixed inset-0 opacity-60" />
          <Dialog.Content className="bg-black flex flex-col ml-auto w-screen md:w-auto fixed top-0 right-0 bg-black z-10">
            <div className="px-7 flex flex-col md:border-l">
              <Dialog.Close
                aria-label="Close"
                className="py-3 ml-auto border-none outline-none text-2xl"
              >
                <div>→ CLOSE</div>
              </Dialog.Close>
              <Image alt="Cart" src={yourCart} />
              <div className="my-7 flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="relative border p-4 flex flex-row gap-4">
                    <div className="relative bg-gradient-to-t from-custom-grey to-black flex items-center">
                      <Image
                        alt={item.product.name}
                        height={200}
                        objectFit="contain"
                        src={item.product.image}
                        width={200}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div>
                        <h1 className="uppercase text-xl">{item.product.name}</h1>
                        <h2 className="text-lg text-gray-500">{item.product.description}</h2>
                      </div>
                      <div className="mt-auto">
                        {item.product.options.map((option) => (
                          <div key={option.label} className="flex items-center">
                            <p className="text-lg uppercase">{`${option.label}: `}</p>
                            <RadioGroup.Root className="flex gap-2 ml-2">
                              {option.values.map((value) => (
                                <div key={value}>
                                  <RadioGroup.Item id={value} value={value}>
                                    <RadioGroup.Indicator />
                                  </RadioGroup.Item>
                                  <label className="cursor-pointer" htmlFor={value}>
                                    {value}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup.Root>
                          </div>
                        ))}
                        <p className="text-lg">
                          QUANTITY:
                          <div className="ml-2 flex gap-2 inline-flex">
                            <button onClick={() => removeFromCart(item.product.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addToCart(item.product)}>+</button>
                          </div>
                        </p>
                        <p className="text-xl">{`$${item.product.price}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center divide-y px-7 md:border md:flex-row md:divide-x md:divide-y-0 md:px-0">
              <div className="p-7 w-full text-3xl">{`TOTAL: $${total}`}</div>
              <Link className="p-7 w-full flex justify-center" href="/">
                <Image alt="Checkout" src={checkout} />
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <Image alt="Header" className="mt-12" src={header} />
    </header>
  );
};

export default Header;
