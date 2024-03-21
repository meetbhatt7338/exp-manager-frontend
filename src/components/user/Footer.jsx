import React from 'react'
import "../../assets/css/Footer.css"
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
<>
 {/* <!-- Site footer --> */}
 <footer class="site-footer">
<div class="containerr">
<div class="row" style={{marginLeft:"3vw"}}>
<div class="col-sm-12 col-md-6">
<h6>About</h6>
<p class="text-justify">Highlight the key features of the expense manager, such as expense tracking, budget management, categorization of expenses, report generation, etc. Optionally, include a version history section that outlines the updates, improvements, and bug fixes made to the expense manager over time. provide legal information such as terms of service, privacy policy, and disclaimer statements regarding the use of the expense manager application.</p>
</div>
<div class="col-6 col-md-3">
<h6>key features</h6>
<ul class="footer-links ">

<li><a href="#">Budget Management</a></li>
<li><a href="#">Reports and Analytics</a></li>
<li><a href="#">Reminders and Alerts</a></li>
<li><a href="#">Security and Privacy</a></li>
<li><a href="#">Customizable Reports</a></li>
</ul>
</div>
<div class="col-6 col-md-3">
<h6>Quick Links</h6>
<ul class="footer-links">
<li><Link to={'/add'}>ADD Expenses</Link></li>
<li><Link to={'/goal'}>Add Goal</Link></li>
<li><Link to={'/list'}>See expenses</Link></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Sitemap</a></li>
</ul>
</div>
</div>
<hr class="small"></hr>
</div>
<div class="containerr">
<div class="row"  style={{marginLeft:"3vw" , marginRight:"10vw"}}>
<div class="col-md-8 col-sm-6 col-12">
<p class="copyright-text">Copyright © 2024 All Rights Reserved by
<a href="#"><span class="logo"> Expmense Manager</span></a>
</p>
</div>
<div class="col-md-4 col-sm-6 col-12">
<ul class="social-icons">
<li><a class="facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
 <li><a class="twitter" href="#"><i class="fab fa-twitter"></i></a></li>
<li><a class="dribbble" href="#"><i class="fab fa-dribbble"></i></a></li>
<li><a class="linkedin" href="#"><i class="fab fa-linkedin-in"></i></a></li>
</ul>
</div>
</div>
</div>
</footer>
</>
  )
}
