import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon } from "react-icons-kit";
import { ic_arrow_drop_down } from "react-icons-kit/md/ic_arrow_drop_down";

import {
  shopFilterPrice,
  shopFetchStart,
  shopShowFilterTag,
} from "../../redux/shop/shop-action";

import "./FilterButton.scss";
import { createStructuredSelector } from "reselect";
import {
  shopFilterTagSelect,
  shopFilterPriceTagSelect,
} from "../../redux/shop/shop-selector";
// import CustomButton from "../custom-button/Custom-button";

const FilterButton = ({
  filterPrice,
  filterCollection,
  shopFetchStart,
  collection,
  shopFilterPrice,
  shopShowFilterTag,
  filterTag,
  filterPriceTag,
}) => {
  const [toggleDrop, setToggleDrop] = useState(false);
  // const [filter, setFilter] = useState("選擇篩選");
  return (
    <span className="filter-button-container">
      <button
        className="filter-button"
        onClick={() => setToggleDrop(!toggleDrop)}
      >
        <span>{filterCollection ? filterTag : filterPriceTag}</span>
        <Icon icon={ic_arrow_drop_down} size={16} />
      </button>
      {toggleDrop && (
        <div
          className={`${
            filterCollection ? "filter-dropdown-custom" : ""
          } filter-dropdown`}
        >
          <ul>
            {filterPrice &&
              filterPrice.map((list) => (
                <li
                  className={`${
                    filterPriceTag === list ? "price-selected" : ""
                  } filter-list`}
                  key={list}
                  onClick={() => {
                    setToggleDrop(!toggleDrop);
                    shopFilterPrice(list);
                  }}
                >
                  {list}
                </li>
              ))}

            {filterCollection &&
              filterCollection.map((list) => (
                <li
                  className={`${
                    filterTag === list ? "price-selected" : ""
                  } filter-list`}
                  key={list}
                  onClick={() => {
                    shopShowFilterTag(list);
                    setToggleDrop(!toggleDrop);
                    shopFetchStart(undefined, list);
                  }}
                >
                  {list}
                </li>
              ))}
            {filterCollection && (
              <li className="cancel-filter-li">
                <span
                  onClick={() => {
                    shopShowFilterTag("選擇篩選");
                    shopFetchStart(collection, undefined);
                  }}
                >
                  取消篩選
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </span>
  );
};

const mapStateToProps = createStructuredSelector({
  filterTag: shopFilterTagSelect,
  filterPriceTag: shopFilterPriceTagSelect,
});

const mapDispatchToProps = (dispatch) => ({
  shopFetchStart: (url, typeUrl) => dispatch(shopFetchStart(url, typeUrl)),
  shopFilterPrice: (priceFilter) => dispatch(shopFilterPrice(priceFilter)),
  shopShowFilterTag: (tag) => dispatch(shopShowFilterTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);
