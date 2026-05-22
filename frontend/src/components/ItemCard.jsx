import React from "react";

const ItemCard = ({ id, name, price, onDelete, onEdit }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        {/* Product Name */}
        <h2 className="card-title text-xl">{name}</h2>

        {/* Price */}
        <p className="text-lg font-medium">
          Price: ₹{Number(price).toFixed(2)}
        </p>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-error btn-sm text-white"
            onClick={() => onDelete(id)}
          >
            Remove
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit({ id, name, price })}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
