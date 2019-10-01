import React from 'react'

export default function SectionHeader (props) {
  return (
    <>
      {props.element.viewDraft 
        ? 
        <></>
        : 
        <div style={{display: 'flex', justifyContent: 'center', margin: '5px 0 10px 0'}}>
          <img style={{height: '50px', transform: 'rotate(90deg)'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveUp(props.i)}/>
          <img style={{height: '50px', transform: 'rotate(-90deg)', marginLeft: '100px'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveDown(props.i)}/>
        </div>
      }
      <div className='paragraph'>
        {props.element.viewDraft 
          ?
          <h3 className='newPostHeader' style={{width: '100%', textAlign: 'left', margin: '0', fontSize: '28px', fontWeight: '100'}}
          onClick={() => props.editElement(props.i)}>
            {props.element.text ? props.element.text : 'Edit me.'}
          </h3>
          :
          <input type='text' placeholder='section title' className='filter quotePerson' style={{width: '100%', margin: '0'}} value={props.element.text}
          onChange={(e) => props.handleChange(props.i, 'text', e.target.value)}/>
        }
      </div>
      {props.element.viewDraft
        ?
        <></>
        :
        <div style={{display: 'flex'}}>
          <button 
            className='viewMoreBtn' style={{margin: '10px 50px 0 0'}}
            onClick={() => {props.viewDraft(props.i)}}>
              Preview
          </button>
          <button 
            className='viewMoreBtn' style={{margin: '10px 0 0 0', backgroundColor: 'red'}}
            onClick={() => {props.deleteElement(props.i)}}>
              Delete
          </button>
        </div>
      }
    </>
  )
}