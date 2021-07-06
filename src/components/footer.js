import React from 'react';

function Footer(props) {
    return(
    <div className="footer">
        <div className="bg-light mt-5">
            <hr/>
            <div className="row justify-content-center">             
                <div className="col-12 col-sm-3 col-md-2 align-self-center">
                    <h5>Project</h5>
                    <div>
		              Dhiraj Bag<br />
		              B.E. in Information Technology<br/>
		              (2nd Year 2nd Semester)<br />
                      Jadavpur University<br />
		              <i className="fa fa-envelope fa-lg"></i> <a href="mailto:dhirajbag.db@gmail.com">
                         dhirajbag.db@gmail.com</a>
                    </div>
                </div>
                <div className="col-12 col-sm-3 col-md-2 mt-3 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/dhiraj-bag-268752186/"><i className="fa fa-linkedin"></i></a>{' '}
                        <a className="btn btn-social-icon" href="mailto:dhirajbag.db@gmail.com"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© 2021 Dhiraj Bag</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;