import React from 'react'

export default function ImageLeft (props) {
  let {element, i} = props

  if (props.state[`image${i}`] && !props.element.url){
    props.updateURL(i, 'url', props.state[`image${i}`])
  } 
  
  return (
    <>
      {element.viewDraft 
        ? 
        <></>
        : 
        <div style={{display: 'flex', justifyContent: 'center', margin: '5px 0 10px 0'}}>
          <img style={{height: '50px', transform: 'rotate(90deg)'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveUp(i)}/>
          <img style={{height: '50px', transform: 'rotate(-90deg)', marginLeft: '100px'}} src="https://simplejoys.s3.amazonaws.com/left-28998_1280-1565889638819.png" alt="arrow"
            onClick={() => props.moveDown(i)}/>
        </div>
      }
      <div style={{display: 'flex', alignItems: 'center', width: 'inherit'}} >
        {props.element.url 
          ?
          <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className='newPostImg' style={{backgroundImage: `url('${props.element.url}')`}}></div>
            {/* <img className='newPostImg' style={{maxWidth: '100%'}} src={props.element.url} alt='new post'/>  */}
            {element.viewDraft 
              ?
              <></>
              :
              <button 
                className='viewMoreBtn' style={{margin: '10px 0 0 0', backgroundColor: 'red'}}
                onClick={() => props.removeImg(`image${i}`)}>
                Remove
              </button>
            }
          </div>
          :
          <div style={{width: '50%'}}>
            <div>
              <h3 className='newPostHeader'>Image Upload</h3>
              <p style={{margin: '0 0 5px 0'}}>Upload Size Limit: 10MB</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <input type="file" onChange={(e) => props.singleFileChangedHandler(e, `selectedFile${i}`)} style={{marginBottom: '10px', maxWidth: '190px', width: '100%'}}/>
              <button className="viewMoreBtn" id={`upload${i}`} 
                onClick={() => props.singleFileUploadHandler(`image${i}`, `upload${i}`, props.selectedFile)} 
                style={{margin: '0'}}>
                  Upload
              </button>
            </div>
          </div>
        }
        {element.viewDraft 
          ?
          <div style={{width: '50%', marginLeft: '10px', display: 'flex', alignItems: 'center'}}
            onClick={() => props.editElement(i)}>
            <div className='quoteInput' style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              <h3 className='newPostHeader' style={{width: '100%', textAlign: 'left', marginLeft: '0'}}>
                {element.text ? element.text : 'Edit me.'}
              </h3>
            </div>
          </div>
          :
          <div style={{width: '50%', marginLeft: '10px'}}>
            <h3 className='newPostHeader' style={{alignSelf: 'center', margin: '0', maxWidth: 'calc(100%-20px)'}}>Paragraph:</h3>
            <div className='quoteInput' style={{maxWidth: 'calc(100%-20px)'}}>
              <textarea type='text' className='textArea' id={`text${i}`} value={element.text}
                onChange={(e) => props.handleChange(i, 'text', e.target.value)}
                style={{width: '100%'}}/>
            </div>
          </div>
        }
      </div>
      {element.viewDraft
        ?
        <></>
        :
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
      }
    </>
  )
}