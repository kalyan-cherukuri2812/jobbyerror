import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsFillBagFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {HiExternalLink} from 'react-icons/hi'
import {MdLocationOn} from 'react-icons/md'
import Cookie from 'js-cookie'
import Header from '../Header'

class Jobdetails extends Component {
  state = {jobdetails: []}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const cookiesData = Cookie.get('jwtToken')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesData}`,
      },
    }
    const response = await fetch(url, options)

    const respData = await response.json()

    if (response.ok) {
      const data = [respData.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        lifeAtCompany: [each.life_at_company].map(eachcompany => ({
          description: eachcompany.description,
          imageUrl: eachcompany.image_url,
        })),
        skills: each.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        title: each.title,
      }))

      this.setState({jobdetails: data[0]})
    }
  }

  render() {
    if (Cookie.get('jwtToken') === undefined) {
      return <Redirect to="/login" />
    }

    const {jobdetails} = this.state
    console.log(jobdetails)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
    } = jobdetails
    console.log(skills)

    return (
      <>
        <Header />
        <div className="job-details-bg-card">
          <div className="job-details-card">
            <div className="comp-name-img-star-card">
              <img className="comp-img" src={companyLogoUrl} alt="img" />
              <div className="name-rating-card">
                <h1 className="comp-name-h">{title}</h1>
                <div className="rating-card">
                  <AiFillStar className="rating-icon" />
                  <p className="rating-p">{rating}</p>
                </div>
              </div>
            </div>

            <div className="loc-pac-div">
              <div className="loc-job-type-div">
                <div className="loc-job-type-sub">
                  <MdLocationOn className="loc-jt-icon" />
                  <p>{location}</p>
                </div>
                <div className="loc-job-type-sub">
                  <BsFillBagFill className="loc-jt-icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <div>
                <p>{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="hr" />
            <div className="description-div">
              <h3 className="desc">Description</h3>
              <div className="visit-div">
                <a className="a-visit" href={companyWebsiteUrl}>
                  Visit
                </a>
                <HiExternalLink className="visit-icon" />
              </div>
            </div>
            <p className="desc-p">{jobDescription}</p>

            <h4 className="desc">Skills</h4>
            {skills.map(eachSkill => (
              <div className="skills-div">
                <img
                  className="skills-img"
                  src={eachSkill.imageUrl}
                  alt="skills img"
                />
                <h5 className="desc-p">{eachSkill}</h5>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Jobdetails
