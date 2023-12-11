import React from "react";
import { MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";

const Item = ({ id, nombre, stock, price, img, showButton = true }) => {
  return (
    <section className="p-8">
      <div className="mt-1 flex flex-col border border-gray-600 bg-[#267469] rounded-xl">
        <Link to={`/item/${id}`}>
          <div className="relative overflow-hidden rounded-xl">
            <img className="object-cover" src={img} alt="product image" />
          </div>
        </Link>
        <div className="mt-1 px-2 pb-1 flex justify-between items-center">
           <h5 className="text-xl text-white truncate font-small">
           {nombre}
           </h5>
           <span className="text-2xl font-small text-white">dh{price}</span>
        </div>
      </div>
    </section>
  );
};

export default Item;
