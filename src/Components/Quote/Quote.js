import React from 'react'

export default function Quote (props) {
  let {element, i} = props
  if(element.viewDraft){
    return(
      <div className='quoteInput' style={{flexDirection: 'column', alignItems: 'center', cursor: 'pointer', maxWidth: '100%'}}
      onClick={() => props.editElement(i)}>
        <div className='quoteBackground'>
          <h3 className='quote'>
            "{element.quote ? element.quote : `Broccoli is the best.`}"
          </h3>
          <h3 className='newPostHeader' style={{alignSelf: 'flex-end', margin: '0 10px 0 0'}}>
            - {element.person ? element.person : `No one ever`}
          </h3>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'center', margin: '5px 0 10px 0'}}>
          <img style={{height: '50px', transform: 'rotate(90deg)'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveUp(i)}/>
          <img style={{height: '50px', transform: 'rotate(-90deg)', marginLeft: '100px'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveDown(i)}/>
        </div>
        <div className='quoteInput'>
          <h3 className='newPostHeader' style={{alignSelf: 'center', margin: '0 10px 0 0'}}>Quote:</h3>
          <h3 className='newPostHeader' style={{fontStyle: 'italic', marginRight: '7px', marginLeft: '0'}}>"</h3>
          <textarea type='text' className='quoteText' id={`quoteInput${i}`}
            onChange={(e) => props.handleChange(i, 'quote', e.target.value)} value={element.quote}/>
          <h3 className='newPostHeader' style={{alignSelf: 'flex-end', fontStyle: 'italic', marginLeft: '0'}}>"</h3>
        </div>
        <div className='quoteInput' style={{marginTop: '10px'}}>
          <h3 className='newPostHeader'>Name:</h3>
          <input id={`quotePerson${i}`} className='filter quotePerson' type="text"
            onChange={(e) => props.handleChange(i, 'person', e.target.value)} value={element.person}/>
        </div>
        <div style={{display: 'flex'}}>
          <button 
            className='viewMoreBtn' style={{margin: '10px 50px 0 0'}}
            onClick={() => {props.viewDraft(i)}}>
              Preview
          </button>
          <button 
            className='viewMoreBtn' style={{margin: '10px 0 0 0', backgroundColor: 'red'}}
            onClick={() => {props.deleteElement(i)}}>
              Delete
          </button>
        </div>
      </>
    )
  }
}