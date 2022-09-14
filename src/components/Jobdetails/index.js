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
  state = {jobdetails: {}, lifeAtCompany: {}, skills: [], similarJobs: []}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const cookiesData = Cookie.get('jwt_token')
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
      const data = {
        companyLogoUrl: respData.job_details.company_logo_url,
        companyWebsiteUrl: respData.job_details.company_website_url,
        employmentType: respData.job_details.employment_type,
        id: respData.job_details.id,
        jobDescription: respData.job_details.job_description,
        location: respData.job_details.location,
        packagePerAnnum: respData.job_details.package_per_annum,
        rating: respData.job_details.rating,
        title: respData.job_details.title,
      }
      const companyData = {
        description: respData.job_details.life_at_company.description,
        imageUrl: respData.job_details.life_at_company.image_url,
      }
      const skill = respData.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      console.log(respData)
      const simliarJobsData = respData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobdetails: data,
        lifeAtCompany: companyData,
        skills: skill,
        similarJobs: simliarJobsData,
      })
    }
  }

  render() {
    if (Cookie.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    const {jobdetails, lifeAtCompany, skills, similarJobs} = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
    } = jobdetails
    console.log(jobdetails)
    console.log(lifeAtCompany)
    console.log(skills)
    console.log(similarJobs)
    return (
      <>
        <Header />
        <div className="job-details-bg-card">
          <div className="job-details-card">
            <div className="comp-name-img-star-card">
              <img
                className="comp-img"
                src={companyLogoUrl}
                alt="job details company logo"
              />
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
              <h1 className="desc">Description</h1>
              <div className="visit-div">
                <a className="a-visit" href={companyWebsiteUrl}>
                  Visit
                </a>
                <HiExternalLink className="visit-icon" />
              </div>
            </div>
            <p className="desc-p">{jobDescription}</p>

            <h4 className="desc">Skills</h4>
            <ul className="skills-div">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="skill-div">
                  <img
                    className="skills-img"
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                  />
                  <h5 className="skill-p">{eachSkill.name}</h5>
                </li>
              ))}
            </ul>

            <h4 className="desc">Life at Company</h4>
            <div className="lf-div">
              <p className="desc-p lf-d">{lifeAtCompany.description}</p>
              <img
                className="lf-img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>

          <h1 className="similar-jobs-h">Similar Jobs</h1>
          <ul className="similar-jobs-bg-div">
            {similarJobs.map(each => (
              <li key={each.id} className="similar-jobs-bg-card">
                <div className="comp-name-img-star-card">
                  <img
                    className="comp-img"
                    src={each.companyLogoUrl}
                    alt="similar job company logo"
                  />
                  <div className="name-rating-card">
                    <h1 className="comp-name-h">{each.title}</h1>
                    <div className="rating-card">
                      <AiFillStar className="rating-icon" />
                      <p className="rating-p">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="desc">Description</h1>
                <p className="desc-p">{each.jobDescription}</p>
                <div className="loc-pac-div">
                  <div className="loc-job-type-div">
                    <div className="loc-job-type-sub">
                      <MdLocationOn className="loc-jt-icon" />
                      <p>{location}</p>
                    </div>
                    <div className="loc-job-type-sub">
                      <BsFillBagFill className="loc-jt-icon" />
                      <p>{each.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Jobdetails
