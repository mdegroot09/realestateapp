import React, {Component} from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import ImageDouble from '../ImageDouble/ImageDouble';
import ImageSingle from '../ImageSingle/ImageSingle';
import ImageRight from '../ImageRight/ImageRight';
import ImageLeft from '../ImageLeft/ImageLeft';
import Quote from '../Quote/Quote'
import Paragraph from '../Paragraph/Paragraph';
import NewElement from '../NewElement/NewElement';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditPostElements extends Component {
  constructor(){
    super()
    this.state = {
      elements: [], 
      draft: false
    }
  }
  
  componentDidMount = () => {
    document.getElementById('publishBtn').innerHTML = 'Update'
    this.getPost()
  }

  getPost = () => {
    axios.get(`/api/getpost/${this.props.match.params.id}`)
    .then(res => {
      this.props.updateTitle(res.data[0].title)
      this.props.updateImageMain(res.data[0].imagemain)
      document.getElementById('draftTab').checked = res.data[0].draft
      this.setState({draft: res.data[0].draft})
      this.updateElements(res.data)
    })
    .catch(err => console.log('err:', err))
  }

  updateElements = (data) => {
    let elements = data.map(element => {
      return {
        id: element.elementid,
        type: element.elementtype,
        text: element.elementtext,
        url: element.elementurl,
        url2: element.elementurl2,
        quote: element.elementquote,
        person: element.elementperson,
        viewDraft: true
      }
    })
    this.setState({elements})
  }

  handleChange = (i, keyName, val) => {
    let {elements} = this.state
    elements[i][keyName] = val
    this.setState({elements})
  }

  viewDraft = (i) => {
    let {elements} = this.state
    elements[i].viewDraft = true
    if (elements[i].text) {
      elements[i].text = elements[i].text.trim()
    }
    this.setState({elements})
  }

  editElement = (i) => {
    let {elements} = this.state
    elements[i].viewDraft = false
    this.setState({elements})
  }

  deleteElement = (i) => {
    if (window.confirm('Are you sure you want to delete this?')){
      let {elements} = this.state
      elements.splice(i, 1)
      this.setState({elements})
    }
  }

  singleFileChangedHandler = (e, stateName) => {
    this.setState({[stateName]: e.target.files[0]});
  }

  updateURL = (i, urlKey, url) => {
    let {elements} = this.state
    elements[i][urlKey] = url
    this.setState({elements})
  } 

  moveUp = (i) => {
    let {elements} = this.state
    let element = elements.slice(i, i + 1)
    elements.splice(i, 1)
    if (i - 1 < 0) {
      elements.splice(elements.length, 0, element[0])
    } else {
      elements.splice(i - 1, 0, element[0])
    }
    this.setState({elements})
  }

  moveDown = (i) => {
    let {elements} = this.state
    let element = elements.slice(i, i + 1)
    elements.splice(i, 1)
    if (i >= elements.length) {
      elements.splice(0, 0, element[0])
    } else {
      elements.splice(i + 1, 0, element[0])
    }
    this.setState({elements})
  }

  addElement = (element) => {
    let {elements} = this.state
    elements.push(element)
    this.setState({elements})
  }

  publishPost = () => {
    let {elements, draft} = this.state
    this.props.updatePost(elements, draft)
  }

  updateTab = (name, id) => {
    let element = document.getElementById(id)
    this.setState({[name]: element.checked})
  }

  render(){
    let displayElements = this.state.elements.map((element, i) => {
      if (element.type === 'paragraph'){
        return(
          <div className='postElement' key={i}>
            <Paragraph
              element={element}
              i={i}
              handleChange={this.handleChange}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
            />
          </div>
        )
      } else if (element.type === 'quote'){
        return(
          <div className='postElement' key={i}>
            <Quote
              element={element}
              i={i}
              handleChange={this.handleChange}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
            />
          </div>
        )
      } else if (element.type === 'imageLeft'){
        return(
          <div className='postElement' style={{cursor: 'pointer'}} key={i}>
            <ImageLeft
              element={element}
              i={i}
              handleChange={this.handleChange}
              state={this.props.state}
              singleFileChangedHandler={this.singleFileChangedHandler}
              singleFileUploadHandler={this.props.singleFileUploadHandler}
              selectedFile={this.state[`selectedFile${i}`]}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              removeImg={this.props.removeImg}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              updateURL={this.updateURL}
            />
          </div>
        )
      } else if (element.type === 'imageRight'){
        return(
          <div className='postElement' style={{cursor: 'pointer'}} key={i}>
            <ImageRight
              element={element}
              i={i}
              handleChange={this.handleChange}
              state={this.props.state}
              singleFileChangedHandler={this.singleFileChangedHandler}
              singleFileUploadHandler={this.props.singleFileUploadHandler}
              selectedFile={this.state[`selectedFile${i}`]}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              removeImg={this.props.removeImg}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              updateURL={this.updateURL}
            />  
          </div>
        )
      } else if (element.type === 'imageSingle'){
        return (
          <div className='postElement' key={i}>
            <ImageSingle
              element={element}
              i={i}
              state={this.props.state}
              singleFileChangedHandler={this.singleFileChangedHandler}
              singleFileUploadHandler={this.props.singleFileUploadHandler}
              selectedFile={this.state[`selectedFile${i}`]}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              removeImg={this.props.removeImg}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              updateURL={this.updateURL}
            />
          </div>
        )
      } else if (element.type === 'imageDouble'){
        return (
          <div className='postElement' key={i}>
            <ImageDouble
              element={element}
              i={i}
              state={this.props.state}
              singleFileChangedHandler={this.singleFileChangedHandler}
              singleFileUploadHandler={this.props.singleFileUploadHandler}
              selectedFileA={this.state[`selectedFile${i}a`]}
              selectedFileB={this.state[`selectedFile${i}b`]}
              editElement={this.editElement}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              removeImg={this.props.removeImg}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
              updateURL={this.updateURL}
            />
          </div>
        )
      } else if (element.type === 'sectionHeader'){
        return (
          <div className='postElement' key={i}>
            <SectionHeader
              element={element}
              i={i}
              editElement={this.editElement}
              handleChange={this.handleChange}
              viewDraft={this.viewDraft}
              deleteElement={this.deleteElement}
              moveUp={this.moveUp}
              moveDown={this.moveDown}
            />
          </div>
        )
      }
      else {
        return <div key={i}></div>
      }
    })
 
    return(
      <>
        {displayElements}
        <NewElement 
          addElement={this.addElement}
          publishPost={this.publishPost}
          updateTab={this.updateTab}
        />
      </>
    )
  }
}

export default withRouter(EditPostElements);