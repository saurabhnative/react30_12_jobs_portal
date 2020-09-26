import React, { useState } from 'react';
const axios = require('axios');
function JobsListing() {
    const [skillName, updateSkillName] = useState("");
    const [jobsArray, updateJobsArray] = useState([]);
    const [isFetching, updateIsFetching] = useState(false);
    function searchJobs() {
        if (skillName.length === 0) {
            alert("Please enter a skill")
        } else {
            updateIsFetching(true)
            axios.get(`http://localhost:5000/jobs_list?skill=${skillName}`)
                .then(function (response) {
                    // handle success
                    updateJobsArray(response.data);
                    updateIsFetching(false)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    updateIsFetching(false)
                })
        }
    }
    function openLinkInNewTab(url) {
        window.open(url, '_blank');
    }
    function renderJobsArray() {
        if (isFetching) {
            return (
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }
        return jobsArray.map((item, index) => {
            return (
                <div key={index} className="card w-100 m-2 text-left p-3" onClick={() => openLinkInNewTab(item.url)}>
                    <div className="d-flex align-items-center">
                        <div>
                            <div className="job-title">
                                <h4>{item.title}</h4>
                            </div>
                            <div className="job-description">
                                {item.company} - {item.type}
                            </div>
                            <div className="job-location">
                                {item.location}
                            </div>
                        </div>
                        <div className="apply-button ml-auto">
                            <button className="btn btn-primary">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="container">
            <div className="search-area d-flex my-4 mx-2">
                <div className="d-flex align-items-center">
                    <div className="mr-4">Skill:</div>
                    <input type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={skillName}
                        onChange={(e) => updateSkillName(e.target.value)}
                    />
                </div>
                <button type="button"
                    className="btn btn-primary ml-4"
                    onClick={() => searchJobs()}
                >
                    Search
                </button>
            </div>
            <div className="search-results-area">
                {renderJobsArray()}
            </div>
        </div>
    );
}

export default JobsListing;
