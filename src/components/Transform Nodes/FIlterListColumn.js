import React from 'react'

function FilterListColumn({ needFilterData }) {

    console.log(needFilterData)
	if ( (needFilterData.length > 0 || needFilterData[0]  !== undefined) && typeof needFilterData === 'object'   ) {
        const oneObjData = needFilterData[0];
        const objectKeys = Object.keys(oneObjData)
        
		const list = objectKeys.map((objectKey, index) => {
            return (
                <option key={index} value={objectKey}>
                    {objectKey}
                </option>
            )
		})

		return <>{list}</>;
	}

	return <></>
}

export default FilterListColumn
