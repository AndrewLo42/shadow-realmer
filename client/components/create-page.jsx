import React from 'react';
import SRContext from './context';

export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.parseTime = this.parseTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  parseTime(month, day, hour, minute, ampm) {
    if (hour === '12') {
      hour = '00';
    }
    if (ampm === 'PM') {
      hour = parseInt(hour, 10) + 12;
    }
    const date = new Date(
      new Date().getFullYear(),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );
    return date;
  }

  handleSubmit(info) {
    const time = this.parseTime(info.month, info.day, info.hour, info.minute, info.ampm);
    info.startTime = time;
    const location = window.location.pathname.includes('hangout') ? '/hangouts' : '/events';
    fetch(`/api${location}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(() => this.props.history.push(`${location}`))
      .catch(err => console.error(err));
  }

  render() {
    return window.location.pathname.includes('hangout')
      ? <CreateHangout handleSubmit={this.handleSubmit} history={this.props.history} user={this.context.user} />
      : <CreateEvent handleSubmit={this.handleSubmit} history={this.props.history} user={this.context.user} />;
  }
}

class CreateHangout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contactInfo: '',
      zipCode: '',
      month: '01',
      day: '01',
      hour: '1',
      minute: '00',
      ampm: 'AM',
      description: '',
      gameId: '',
      gameFormat: '',
      isValid: true
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContactInfoChange = this.handleContactInfoChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleAmpmChange = this.handleAmpmChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleGameIdChange = this.handleGameIdChange.bind(this);
    this.handleGameFormatChange = this.handleGameFormatChange.bind(this);
    this.handleValidForm = this.handleValidForm.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleContactInfoChange(event) {
    this.setState({ contactInfo: event.target.value });
  }

  handleZipCodeChange(event) {
    this.setState({ zipCode: event.target.value });

  }

  handleMonthChange(event) {
    this.setState({ month: event.target.value });
  }

  handleDayChange(event) {
    this.setState({ day: event.target.value });
  }

  handleHourChange(event) {
    this.setState({ hour: event.target.value });
  }

  handleMinuteChange(event) {
    this.setState({ minute: event.target.value });
  }

  handleAmpmChange(event) {
    this.setState({ ampm: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleGameIdChange(event) {
    this.setState({ gameId: event.target.value });
  }

  handleGameFormatChange(event) {
    this.setState({ gameFormat: event.target.value });
  }

  handleValidForm(info) {
    if (!info.name || !info.gameId || !info.gameFormat || !info.description) {
      this.setState({ isValid: false });
    } else {
      this.props.handleSubmit(info);
    }
  }

  renderFormatOptions() {
    if (this.state.gameId === '1') {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat}>
          <option value="null" hidden>Format</option>
          <option value="Modern">Modern</option>
          <option value="Standard">Standard</option>
          <option value="Pioneer">Pioneer</option>
          <option value="Commander">Commander</option>
          <option value="Legacy">Legacy</option>
        </select>
      );
    } else if (this.state.gameId === '2') {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat} >
          <option value="null" hidden>Format</option>
          <option value="Yu-Gi-Oh">Yu-Gi-Oh</option>
        </select>
      );
    } else {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat}>
        </select>
      );
    }
  }

  render() {
    let invalidForm = 'hidden';
    if (!this.state.isValid) {
      invalidForm = null;
    }

    let disabledOption = false;
    if (this.state.gameId) {
      disabledOption = true;
    }
    return (
      <div className="create-page">
        <header className="title">Create Hangout</header>
        <input type="text" className="long-input input" placeholder="Hangout Title" onChange={this.handleTitleChange} value={this.state.name}/>
        <input type="text" className="long-input input" placeholder="Contact Info" onChange={this.handleContactInfoChange} value={this.state.contactInfo}/>
        <input type="number" maxLength="5" className="long-input input" placeholder="Zip Code" onChange={this.handleZipCodeChange} value={this.state.zipCode}/>
        <div className="short-container">
          <div className="date-container short-input input">
            <select name="month" className="date-selector selector-left" onChange={this.handleMonthChange} value={this.state.month}>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select name="day" className="date-selector selector-right" onChange={this.handleDayChange} value={this.state.day}>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <div className="time-container short-input input">
            <select name="hour" className="time-selector selector-left" onChange={this.handleHourChange} value={this.state.hour}>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select name="minute" className="time-selector selector-middle" onChange={this.handleMinuteChange} value={this.state.minute}>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select name="ampm" className="time-selector selector-right" onChange={this.handleAmpmChange} value={this.state.ampm}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <textarea name="description" cols="30" rows="10" placeholder="Description" className="input long-input description" onChange={this.handleDescriptionChange} value={this.state.description}/>
        <div className="short-container">
          <select name="game" className="input short-input" onChange={this.handleGameIdChange} value={this.state.gameId}>
            <option value="null" disabled={disabledOption}>Game</option>
            <option value="1">Magic</option>
            <option value="2">Yu-Gi-Oh</option>
          </select>
          {this.renderFormatOptions()}
        </div>
        <div className="short-container">
          <button className="short-input input cancel" onClick={() => this.props.history.push('/hangouts')}>Cancel</button>
          <button className="short-input input confirm" onClick={() => this.handleValidForm(this.state)}>Confirm</button>
        </div>
        <div className={`${invalidForm} error-blurb error-text`} >Missing Information</div>
      </div>
    );
  }
}

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      storeName: this.props.user.storeName,
      month: '01',
      day: '01',
      hour: '1',
      minute: '00',
      ampm: 'AM',
      description: '',
      gameId: '',
      gameFormat: '',
      entranceFee: '',
      isValid: true
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleAmpmChange = this.handleAmpmChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleGameIdChange = this.handleGameIdChange.bind(this);
    this.handleGameFormatChange = this.handleGameFormatChange.bind(this);
    this.handleEntranceFeeChange = this.handleEntranceFeeChange.bind(this);
    this.handleValidForm = this.handleValidForm.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleStoreChange(event) {
    this.setState({ storeName: event.target.value });
  }

  handleMonthChange(event) {
    this.setState({ month: event.target.value });
  }

  handleDayChange(event) {
    this.setState({ day: event.target.value });
  }

  handleHourChange(event) {
    this.setState({ hour: event.target.value });
  }

  handleMinuteChange(event) {
    this.setState({ minute: event.target.value });
  }

  handleAmpmChange(event) {
    this.setState({ ampm: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleGameIdChange(event) {
    this.setState({ gameId: event.target.value });
  }

  handleGameFormatChange(event) {
    this.setState({ gameFormat: event.target.value });
  }

  handleEntranceFeeChange(event) {
    this.setState({ entranceFee: event.target.value });
  }

  handleValidForm(info) {
    if (!info.name || !info.gameId || !info.gameFormat || !info.description || !info.entranceFee) {
      this.setState({ isValid: false });
    } else {
      this.props.handleSubmit(info);
    }
  }

  renderFormatOptions() {
    if (this.state.gameId === '1') {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat}>
          <option value="null" hidden>Format</option>
          <option value="Modern">Modern</option>
          <option value="Standard">Standard</option>
          <option value="Pioneer">Pioneer</option>
          <option value="Commander">Commander</option>
          <option value="Legacy">Legacy</option>
        </select>
      );
    } else if (this.state.gameId === '2') {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat} >
          <option value="null" hidden>Format</option>
          <option value="Yu-Gi-Oh">Yu-Gi-Oh</option>
        </select>
      );
    } else {
      return (
        <select name="format" className="input short-input" onChange={this.handleGameFormatChange} value={this.state.gameFormat}>
        </select>
      );
    }
  }

  render() {
    let invalidForm = 'hidden';
    if (!this.state.isValid) {
      invalidForm = null;
    }

    return (
      <div className="create-page">
        <header className="title">Create Event</header>
        <input type="text" className="long-input input" placeholder="Event Title" onChange={this.handleTitleChange} value={this.state.name} />
        <div className="short-container">
          <div className="date-container short-input input">
            <select name="month" className="date-selector selector-left" onChange={this.handleMonthChange} value={this.state.month}>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select name="day" className="date-selector selector-right" onChange={this.handleDayChange} value={this.state.day}>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <div className="time-container short-input input">
            <select name="hour" className="time-selector selector-left" onChange={this.handleHourChange} value={this.state.hour}>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select name="minute" className="time-selector selector-middle" onChange={this.handleMinuteChange} value={this.state.minute}>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select name="ampm" className="time-selector selector-right" onChange={this.handleAmpmChange} value={this.state.ampm}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <textarea name="description" cols="30" rows="10" placeholder="Description" className="input long-input description" onChange={this.handleDescriptionChange} value={this.state.description} />
        <div className="short-container">
          <select name="game" className="input short-input" onChange={this.handleGameIdChange} value={this.state.gameId}>
            <option value="null">Game</option>
            <option value="1">Magic</option>
            <option value="2">Yu-Gi-Oh</option>
          </select>
          {this.renderFormatOptions()}
        </div>
        <input type="number" className="long-input input" placeholder="Entrance Fee" onChange={this.handleEntranceFeeChange} value={this.state.entranceFee}/>
        <div className="short-container">
          <button className="short-input input cancel" onClick={() => this.props.history.push('/events')}>Cancel</button>
          <button className="short-input input confirm" onClick={() => this.handleValidForm(this.state)}>Confirm</button>
        </div>
        <div className={`${invalidForm} error-blurb error-text`} >Missing Information,</div>
        <div className={`${invalidForm} error-blurb error-text`} >All Fields Required</div>
      </div>
    );
  }
}

CreatePage.contextType = SRContext;
