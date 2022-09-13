import './index.css'
import {Redirect, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import {Component} from 'react'
import {BsSearch, BsFillBagFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Header from '../Header'

class Jobs extends Component {
  state = {
    search: '',
    profilData: {},
    profilFailerView: false,
    jobsDataList: [],
    loader: '',
    salaryRange: '',
    employType: [],
  }

  employChange = event => {
    const {employType} = this.state

    if (event.target.checked) {
      this.setState(
        prev => ({
          employType: [...new Set([...prev.employType, event.target.id])],
        }),
        this.getData,
      )
    } else {
      const updatedemployType = employType.filter(
        each => each !== event.target.id,
      )
      this.setState({employType: updatedemployType}, this.getData)
    }
  }

  salaryChange = event => {
    this.setState({salaryRange: event.target.id}, this.getData)
  }

  searchChange = event => {
    this.setState({search: event.target.value})
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const cookiesData = Cookie.get('jwtToken')
    this.setState({loader: true})
    const {salaryRange, employType} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employType}&minimum_package=${salaryRange}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)
    const respData = await response.json()

    if (response.ok) {
      const camCaseData = respData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobsDataList: camCaseData, loader: false})
    }
    const profilResponse = await fetch(' https://apis.ccbp.in/profile', options)
    const profilRespData = await profilResponse.json()

    if (profilResponse.ok) {
      let camCaseProfilData = profilRespData.profile_details

      camCaseProfilData = {
        profileImageUrl: camCaseProfilData.profile_image_url,
        name: camCaseProfilData.name,
        shortBio: camCaseProfilData.short_bio,
      }
      this.setState({profilData: camCaseProfilData})
      this.setState({profilFailerView: false})
    } else {
      this.setState({profilFailerView: true})
    }
  }

  render() {
    const {
      search,
      profilData,
      profilFailerView,
      jobsDataList,
      loader,
      salaryRange,
      employType,
    } = this.state

    const searchResult = jobsDataList.filter(each =>
      each.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    )
    const {salaryRangesListItem, employmentTypesList} = this.props

    if (Cookie.get('jwtToken') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobs-bg-card">
        <Header />
        <div className="jobs-card">
          <div className="jobs-filter-card">
            <div className="jobs-search-div">
              <input
                value={search}
                onChange={this.searchChange}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <BsSearch className="search-icon" />
            </div>

            {profilFailerView === true ? (
              <button className="profil-retry-btn" type="button">
                Retry
              </button>
            ) : (
              <div className="profil-card">
                <img src={profilData.profileImageUrl} alt="profil" />
                <h1 className="profil-name">{profilData.name}</h1>
                <p>{profilData.shortBio} </p>
              </div>
            )}
            <hr className="hr" />

            <div className="type-of-employment-div">
              <h3 className="typ-of-emp-p">Type of Employment</h3>
              {employmentTypesList.map(each => (
                <div key={each.employmentTypeId} className="checkbox-div">
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={employType}
                    onChange={this.employChange}
                    id={each.employmentTypeId}
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="typ-of-emp-p"
                  >
                    {each.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="hr" />
            <div className="type-of-employment-div">
              <h3 className="typ-of-emp-p">Salary Range</h3>
              {salaryRangesListItem.map(each => (
                <div key={each.salaryRangeId} className="checkbox-div">
                  <input
                    className="checkbox"
                    value={salaryRange}
                    onChange={this.salaryChange}
                    type="radio"
                    name="salary"
                    id={each.salaryRangeId}
                  />
                  <label className="typ-of-emp-p" htmlFor={each.salaryRangeId}>
                    {each.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="jobs-display-card">
            <div className="jobs-search-div-lg">
              <input
                value={search}
                onChange={this.searchChange}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <BsSearch className="search-icon" />
            </div>
            {loader === true ? (
              <div className="loader-container">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <>
                {searchResult.map(each => (
                  <Link key={each.id} className="link" to={`/jobs/${each.id}`}>
                    <li className="j-d-li">
                      <div className="comp-name-img-star-card">
                        <img
                          className="comp-img"
                          src={each.companyLogoUrl}
                          alt="img"
                        />
                        <div className="name-rating-card">
                          <h1 className="comp-name-h">{each.title}</h1>
                          <div className="rating-card">
                            <AiFillStar className="rating-icon" />
                            <p className="rating-p">{each.rating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="loc-pac-div">
                        <div className="loc-job-type-div">
                          <div className="loc-job-type-sub">
                            <MdLocationOn className="loc-jt-icon" />
                            <p>{each.location}</p>
                          </div>
                          <div className="loc-job-type-sub">
                            <BsFillBagFill className="loc-jt-icon" />
                            <p>{each.employmentType}</p>
                          </div>
                        </div>
                        <div>
                          <p>{each.packagePerAnnum}</p>
                        </div>
                      </div>
                      <hr className="hr" />
                      <h3 className="desc">Description</h3>
                      <p className="desc-p">{each.jobDescription}</p>
                    </li>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
