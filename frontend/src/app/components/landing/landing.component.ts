import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  bids = [
    {
      title: "Vehicle Hiring and Sales",
      dueDate: "30 Aug 2021",
      downloadLink: ""
    },
    {
      title: "Request for proposals for the supply, installation of Firewall solution",
      dueDate: "30 Aug 2021",
      downloadLink: ""
    },
    {
      title: "Request for proposals for the supply, installation and commisioning of Virtual Private Network (VPN) concentrator solution technology for MTC Namibia",
      dueDate: "30 Aug 2021",
      downloadLink: ""
    },
    {
      title: "Vehicle Hiring and Sales",
      dueDate: "30 Aug 2021",
      downloadLink: ""
    }
  ]

  docs = [
    {
      title: "The Act of Parliament 2015 [PDF]",
      text: "Act of parliament of 2015 (Act no. 15 of 2015)",
      downloadLink: ""
    },
    {
      title: "Standard Bids Document",
      text: "An outline of what to expect during bidding",
      downloadLink: ""
    },
    {
      title: "Board Decisions",
      text: "Latest document with all the recent board decisions",
      downloadLink: ""
    },
    {
      title: "Market Price Index July 2021",
      text: "The market price index dated July 2021",
      downloadLink: ""
    },
    {
      title: "Annual Report 2020",
      text: "The annual report for the year 2019 - 2020",
      downloadLink: ""
    },
    {
      title: "Request for Debarment form",
      text: "Download the Request for Debarment form here",
      downloadLink: ""
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
