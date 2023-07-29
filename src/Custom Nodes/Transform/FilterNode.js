import React from "react";
import { Handle, Position } from "reactflow";
import FilterListColumn from "../../components/Transform Nodes/FIlterListColumn";

function FilterNode({ id, data }) {
  const onChangeSelect = (e) =>{
    console.log(e.target);
  }

  return (
    <div className="filter-data-node  cont-custom-node">
      <Handle
        className="handle-left-custom-node handle-left__filter-data-node"
        type="target"
        position={Position.Left}
      ></Handle>
      <div className="detail-node">
        <div className="heading-node heading__filter-data-node">
          <h5 className="title__heading-node">Filter</h5>
          <div className="close">X</div>
        </div>
        <div className="detail-indicators-cont__filter-data-node">
            <div className="input-cont__detail-indicators-cont">
              <label htmlFor="indicators" className="label-for-input">Column name : </label>
              <div className="cont-indicators__detail-indicators-cont">
                <select name="indicators" id="indicators" className="input-inside-node select-inside-node">
                  {Object.entries(data).length === 0 ? (
                    <option value="empty">connect dataset...</option>
                  ) : (
                    
                    <FilterListColumn needFilterData={data} />
                  )}
                </select>
              </div>
              {Object.entries(data).length > 0 ? (
                <>
                  <label htmlFor="condition" className="label-for-input">Condition : </label>
                  <select name="condition" id="condition" className="input-inside-node select-inside-node" onChange={onChangeSelect}>
                    <option value="select-condition">select condition</option>
                    <option value="data-not-null">data is not empty or null</option>
                  </select>
                </>
              ) : (
                " "
              )}
            </div>
            <button className="btn-node filter-data-node__run-btn">Run</button>
        </div>
      </div>
      <Handle
        className="handle-right-custom-node handle-right__filter-data-node"
        type="source"
        position={Position.Right}
        
      
      ></Handle>
    </div>
  );
}

export default FilterNode;
