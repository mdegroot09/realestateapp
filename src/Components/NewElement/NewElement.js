import React, {Component} from 'react'

export default class NewElement extends Component {
  constructor(){
    super()
    this.state = {
      options: [
        {type: 'sectionHeader', imgURL: 'https://simplejoys.s3.amazonaws.com/Section%20Header-1565388208417.jpg'},
        {type: 'paragraph', imgURL: 'https://simplejoys.s3.amazonaws.com/paragraph-1565388243454.jpg'}, 
        {type: 'quote', imgURL: 'https://simplejoys.s3.amazonaws.com/quote-1565388269768.jpg'},        
        {type: 'imageLeft', imgURL: 'https://simplejoys.s3.amazonaws.com/imageLeft-1565388291401.jpg'},
        {type: 'imageRight', imgURL: 'https://simplejoys.s3.amazonaws.com/imageRight-1565388315323.jpg'},
        {type: 'imageSingle', imgURL: 'https://simplejoys.s3.amazonaws.com/imageSingle-1565388334636.jpg'},
        {type: 'imageDouble', imgURL: 'https://simplejoys.s3.amazonaws.com/imageDouble-1565388353233.jpg'}
      ],
      showOptions: false
    }
  }

  componentDidMount = () => {
    let element = document.getElementsByClassName('showOptions')[0]
    element.style.display = 'none'
  }

  addElement = (type) => {
    this.showHideDropdown()
    let obj = {}
    switch (type){
      case 'sectionHeader':
        obj = {type: 'sectionHeader', text: ''}
        return this.props.addElement(obj)
      case 'paragraph':
        obj = {type: 'paragraph', text: ''}
        return this.props.addElement(obj)
      case 'quote':
        obj = {type: 'quote', quote: '', person: ''}
        return this.props.addElement(obj)
      case 'imageLeft':       
        obj = {type: 'imageLeft', url: '', text: ''}
        return this.props.addElement(obj)
      case 'imageRight': 
        obj = {type: 'imageRight', url: '', text: ''}
        return this.props.addElement(obj)
      case 'imageSingle':
        obj = {type: 'imageSingle', url: ''}
        return this.props.addElement(obj)
      case 'imageDouble': 
        obj = {type: 'imageDouble', url: '', url2: ''}
        return this.props.addElement(obj)
      default:
        return
    }
  }

  showHideDropdown = () => {
    let element = document.getElementsByClassName('showOptions')[0]
    if (element.style.display === 'none'){
      element.style.display = 'inline'
      this.setState({showOptions: true})
    } else {
      element.style.display = 'none'
      this.setState({showOptions: false})
    }
  }

  render(){
    let showOptions = this.state.options.map((option, i) => {
      return (
        <button className='newElement' key={i} onClick={() => this.addElement(option.type)}>
          <img className='dropdownImg' src={option.imgURL} alt="element preview"/>
        </button>
      )
    })

    return (
      <div className='postElement' style={{borderBottom: 'none', zIndex: '1', backgroundImage: 'linear-gradient(90deg, #3FFFFB, #2b9fdd)'}}>
        <button className='showMoreBtn' onClick={this.showHideDropdown}>
          {!this.state.showOptions ? '+' : '-'}
        </button>
        <div className='showOptions'>
          {showOptions}
        </div>
        <div className='labels'>
          <input type="checkbox" id='familyTab' onChange={() => this.props.updateTab('family', 'familyTab')}/>
          <label htmlFor="familyTab" style={{fontSize: '20px'}}>Family</label>
          <input type="checkbox" id='makeupTab' style={{marginLeft: '15px'}} onChange={() => this.props.updateTab('makeup', 'makeupTab')}/>
          <label htmlFor="makeupTab" style={{fontSize: '20px'}}>Makeup</label>
          <input type="checkbox" id='foodTab' style={{marginLeft: '20px'}} onChange={() => this.props.updateTab('food', 'foodTab')}/>
          <label htmlFor="foodTab" style={{fontSize: '20px'}}>Food</label>
        </div>
        <button className='viewMoreBtn' id='publishBtn'
          onClick={this.props.publishPost}>
            Publish
        </button>
      </div>
    )
  }
}