// Edit the question bank here. Keep each prompt, choice, answer, and explanation together.
export const SECTIONS = [
  {
    id: "A",
    title: "T1 Help Desk — Deeper Fundamentals",
    questions: [
      {
        number: 1,
        prompt: "A user reports their computer is running slowly. What is the first step?",
        choices: [
          { id: "A", text: "Reinstall Windows" },
          { id: "B", text: "Ask when it started and what changed recently" },
          { id: "C", text: "Replace the hard drive" },
          { id: "D", text: "Ignore it; it will fix itself" }
        ],
        answer: "B",
        explanation: "Always gather information before acting."
      },
      {
        number: 2,
        prompt: "What does ITIL stand for?",
        choices: [
          { id: "A", text: "Information Technology Infrastructure Library" },
          { id: "B", text: "International Tech Incident Log" },
          { id: "C", text: "Internet Troubleshooting Interface Layer" },
          { id: "D", text: "Integrated Ticket Lifecycle" }
        ],
        answer: "A"
      },
      {
        number: 3,
        prompt: "What is the Principle of Least Privilege?",
        choices: [
          { id: "A", text: "Give every user admin rights" },
          { id: "B", text: "Give users only the minimum access needed to do their job" },
          { id: "C", text: "Share passwords among the team" },
          { id: "D", text: "Disable multi-factor authentication" }
        ],
        answer: "B"
      },
      {
        number: 4,
        prompt: "A user cannot access their email. What should you check first?",
        choices: [
          { id: "A", text: "Reinstall Outlook" },
          { id: "B", text: "Check their internet connection" },
          { id: "C", text: "Reset their password" },
          { id: "D", text: "Call the ISP" }
        ],
        answer: "B",
        explanation: "Start with the most likely and simplest cause."
      },
      {
        number: 5,
        prompt: "What is a ticket priority usually based on?",
        choices: [
          { id: "A", text: "How much the client pays" },
          { id: "B", text: "Urgency and impact on business" },
          { id: "C", text: "How long the ticket has been open" },
          { id: "D", text: "The number of tickets in the queue" }
        ],
        answer: "B"
      },
      {
        number: 6,
        prompt: "What is escalation?",
        choices: [
          { id: "A", text: "Closing a ticket without resolution" },
          { id: "B", text: "Passing a ticket to a higher tier of support" },
          { id: "C", text: "Deleting a ticket" },
          { id: "D", text: "Ignoring a ticket" }
        ],
        answer: "B"
      },
      {
        number: 7,
        prompt: "What does a VPN provide?",
        choices: [
          { id: "A", text: "Faster internet speed" },
          { id: "B", text: "A secure, encrypted connection to a remote network" },
          { id: "C", text: "Ad blocking" },
          { id: "D", text: "File storage" }
        ],
        answer: "B"
      },
      {
        number: 8,
        prompt: "What is DNS?",
        choices: [
          { id: "A", text: "Dynamic Network System" },
          { id: "B", text: "Domain Name System" },
          { id: "C", text: "Data Network Security" },
          { id: "D", text: "Digital Naming Service" }
        ],
        answer: "B"
      },
      {
        number: 9,
        prompt: "What is an MX record used for?",
        choices: [
          { id: "A", text: "Mail Exchange — directs email to the correct mail server" },
          { id: "B", text: "Master XML — defines website structure" },
          { id: "C", text: "Managed Exchange — controls file sharing" },
          { id: "D", text: "Message Transfer — encrypts email" }
        ],
        answer: "A"
      },
      {
        number: 10,
        prompt: "A user says \"my email isn't working.\" What is the best first response?",
        choices: [
          { id: "A", text: "\"Have you tried turning it off and on again?\"" },
          { id: "B", text: "\"Can you tell me exactly what happens when you try to send or receive?\"" },
          { id: "C", text: "\"I'll escalate this immediately.\"" },
          { id: "D", text: "\"That's not my problem.\"" }
        ],
        answer: "B",
        explanation: "Gather specifics before troubleshooting."
      }
    ]
  },
  {
    id: "B",
    title: "Email Deliverability & DNS",
    questions: [
      {
        number: 11,
        prompt: "Which DNS record lists the servers authorized to send email for a domain?",
        choices: [
          { id: "A", text: "SPF" },
          { id: "B", text: "DKIM" },
          { id: "C", text: "DMARC" },
          { id: "D", text: "MX" }
        ],
        answer: "A"
      },
      {
        number: 12,
        prompt: "What does DKIM do?",
        choices: [
          { id: "A", text: "Encrypts the email body" },
          { id: "B", text: "Adds a digital signature to prove the email wasn't altered" },
          { id: "C", text: "Blocks spam" },
          { id: "D", text: "Routes email to the correct inbox" }
        ],
        answer: "B"
      },
      {
        number: 13,
        prompt: "What does DMARC policy `p=reject` instruct receiving servers to do?",
        choices: [
          { id: "A", text: "Monitor only" },
          { id: "B", text: "Send to spam" },
          { id: "C", text: "Reject emails that fail authentication" },
          { id: "D", text: "Allow all emails" }
        ],
        answer: "C"
      },
      {
        number: 14,
        prompt: "Which free tool is commonly used to check SPF, DKIM, DMARC, and blacklists?",
        choices: [
          { id: "A", text: "MXToolbox" },
          { id: "B", text: "Photoshop" },
          { id: "C", text: "Excel" },
          { id: "D", text: "Slack" }
        ],
        answer: "A"
      },
      {
        number: 15,
        prompt: "A client's emails are still going to spam even though SPF, DKIM, and DMARC are correct. What should you check next?",
        choices: [
          { id: "A", text: "Give up" },
          { id: "B", text: "Check if the domain or sending IP is on a blacklist" },
          { id: "C", text: "Delete the domain" },
          { id: "D", text: "Send more emails" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: "C",
    title: "Scenario-Based Troubleshooting",
    questions: [
      {
        number: 16,
        prompt: "A client says: \"Our emails are bouncing back with a Google error about DMARC.\" What do you do first?",
        choices: [
          { id: "A", text: "Tell them to switch to Outlook" },
          { id: "B", text: "Run an MXToolbox DMARC check and review their current DNS records" },
          { id: "C", text: "Delete their DMARC record" },
          { id: "D", text: "Ignore it; it's a Google bug" }
        ],
        answer: "B"
      },
      {
        number: 17,
        prompt: "You're on a screen share and notice the client's SPF record has `~all` instead of `-all`. What does `~all` mean?",
        choices: [
          { id: "A", text: "Hard fail — reject all unauthorized emails" },
          { id: "B", text: "Soft fail — mark as suspicious but don't reject" },
          { id: "C", text: "Allow all" },
          { id: "D", text: "No policy" }
        ],
        answer: "B"
      },
      {
        number: 18,
        prompt: "The client asks you to also redesign their website while you're fixing DNS. What do you say?",
        choices: [
          { id: "A", text: "\"Sure, I'll do it for free.\"" },
          { id: "B", text: "\"That's outside the current scope. I'd be happy to send a separate proposal for website work.\"" },
          { id: "C", text: "\"No, I can't do that.\"" },
          { id: "D", text: "\"I'll try but it might break something.\"" }
        ],
        answer: "B"
      },
      {
        number: 19,
        prompt: "You're mid-call and your power goes out. What's the best recovery?",
        choices: [
          { id: "A", text: "Never come back" },
          { id: "B", text: "When you return, apologize briefly, explain the local outage, and continue where you left off" },
          { id: "C", text: "Blame the client" },
          { id: "D", text: "Say nothing and hope they forget" }
        ],
        answer: "B"
      },
      {
        number: 20,
        prompt: "After fixing DNS, what should you always do before closing the ticket?",
        choices: [
          { id: "A", text: "Ask for a 5-star review and send a screenshot of the passing MXToolbox check" },
          { id: "B", text: "Immediately remove your access without telling them" },
          { id: "C", text: "Delete all records" },
          { id: "D", text: "Nothing" }
        ],
        answer: "A"
      }
    ]
  },
  {
    id: "D",
    title: "T1 Help Desk — Deeper Fundamentals",
    questions: [
      {
        number: 21,
        prompt: "A user's account keeps locking out every few minutes. What is the most likely cause?",
        choices: [
          { id: "A", text: "Their password is too short" },
          { id: "B", text: "A saved credential on another device is repeatedly trying the old password" },
          { id: "C", text: "The server is down" },
          { id: "D", text: "Their email is full" }
        ],
        answer: "B",
        explanation: "Stored credentials on phones, mapped drives, or services are the most common cause of repeated lockouts."
      },
      {
        number: 22,
        prompt: "What does \"SLA\" stand for in IT support?",
        choices: [
          { id: "A", text: "System Login Access" },
          { id: "B", text: "Service Level Agreement" },
          { id: "C", text: "Software License Authorization" },
          { id: "D", text: "Secure Local Account" }
        ],
        answer: "B",
        explanation: "It defines expected response and resolution times."
      },
      {
        number: 23,
        prompt: "A user says their printer isn't working. What should you check first?",
        choices: [
          { id: "A", text: "Replace the printer" },
          { id: "B", text: "Check if it's powered on, connected, and set as default" },
          { id: "C", text: "Reinstall Windows" },
          { id: "D", text: "Call the manufacturer" }
        ],
        answer: "B",
        explanation: "Start with the simplest physical and configuration checks."
      },
      {
        number: 24,
        prompt: "What is Active Directory primarily used for?",
        choices: [
          { id: "A", text: "Managing user accounts, permissions, and devices in a Windows network" },
          { id: "B", text: "Editing photos" },
          { id: "C", text: "Sending emails" },
          { id: "D", text: "Hosting websites" }
        ],
        answer: "A"
      },
      {
        number: 25,
        prompt: "What command would you use to check basic network connectivity to a server?",
        choices: [
          { id: "A", text: "ping" },
          { id: "B", text: "delete" },
          { id: "C", text: "format" },
          { id: "D", text: "rename" }
        ],
        answer: "A"
      },
      {
        number: 26,
        prompt: "A user reports they can't access any websites, but their colleague next to them can. What should you check first?",
        choices: [
          { id: "A", text: "The entire company's internet" },
          { id: "B", text: "The user's local connection, IP settings, and whether they're on the right network" },
          { id: "C", text: "Replace their computer" },
          { id: "D", text: "Call the ISP" }
        ],
        answer: "B",
        explanation: "Isolate the problem to the user's device before escalating."
      },
      {
        number: 27,
        prompt: "What is the purpose of a knowledge base article?",
        choices: [
          { id: "A", text: "To store client passwords" },
          { id: "B", text: "To document solutions so issues can be resolved faster in the future" },
          { id: "C", text: "To replace all IT staff" },
          { id: "D", text: "To track employee hours" }
        ],
        answer: "B"
      },
      {
        number: 28,
        prompt: "A user forwards you a suspicious email asking for their password. What should you do?",
        choices: [
          { id: "A", text: "Reply to the email to verify" },
          { id: "B", text: "Tell the user to delete it and report it as phishing; never click links or provide credentials" },
          { id: "C", text: "Open the attachment to see what it is" },
          { id: "D", text: "Forward it to all staff as a warning" }
        ],
        answer: "B",
        explanation: "Recognize phishing, do not interact with it, and report it."
      },
      {
        number: 29,
        prompt: "What is the difference between a hardware and software issue?",
        choices: [
          { id: "A", text: "There is no difference" },
          { id: "B", text: "Hardware is physical (e.g., broken keyboard), software is program-related (e.g., app crashing)" },
          { id: "C", text: "Software is always faster to fix" },
          { id: "D", text: "Hardware only affects servers" }
        ],
        answer: "B"
      },
      {
        number: 30,
        prompt: "A user asks you to install unauthorized software on their work laptop. What do you do?",
        choices: [
          { id: "A", text: "Install it anyway" },
          { id: "B", text: "Explain it's against company policy and escalate to their manager if needed" },
          { id: "C", text: "Ignore the request" },
          { id: "D", text: "Tell them to install it themselves" }
        ],
        answer: "B",
        explanation: "Follow policy and escalate appropriately."
      }
    ]
  },
  {
    id: "E",
    title: "Email Deliverability & DNS — Advanced",
    questions: [
      {
        number: 31,
        prompt: "What is the maximum number of DNS lookups allowed in a single SPF record?",
        choices: [
          { id: "A", text: "5" },
          { id: "B", text: "10" },
          { id: "C", text: "20" },
          { id: "D", text: "Unlimited" }
        ],
        answer: "B",
        explanation: "SPF has a hard limit of 10 DNS lookups; exceeding it causes SPF to fail."
      },
      {
        number: 32,
        prompt: "What does an A record do?",
        choices: [
          { id: "A", text: "Maps a domain name to an IP address" },
          { id: "B", text: "Routes email" },
          { id: "C", text: "Signs outgoing email" },
          { id: "D", text: "Blocks spam" }
        ],
        answer: "A"
      },
      {
        number: 33,
        prompt: "What is a CNAME record used for?",
        choices: [
          { id: "A", text: "Aliasing one domain name to another" },
          { id: "B", text: "Encrypting email" },
          { id: "C", text: "Storing passwords" },
          { id: "D", text: "Tracking website visitors" }
        ],
        answer: "A"
      },
      {
        number: 34,
        prompt: "In DMARC, what is the difference between `p=none` and `p=quarantine`?",
        choices: [
          { id: "A", text: "None = reject, Quarantine = allow" },
          { id: "B", text: "None = monitor only, Quarantine = send failing emails to spam" },
          { id: "C", text: "They are the same" },
          { id: "D", text: "None = delete, Quarantine = forward" }
        ],
        answer: "B"
      },
      {
        number: 35,
        prompt: "What is the purpose of a DMARC `rua` address?",
        choices: [
          { id: "A", text: "It receives aggregate reports about who is sending email on behalf of the domain" },
          { id: "B", text: "It forwards all email to a backup inbox" },
          { id: "C", text: "It blocks all email" },
          { id: "D", text: "It is the admin's personal email" }
        ],
        answer: "A"
      },
      {
        number: 36,
        prompt: "A client's SPF record says `v=spf1 include:_spf.google.com -all`. What does `-all` mean?",
        choices: [
          { id: "A", text: "Soft fail — suspicious but allow" },
          { id: "B", text: "Hard fail — reject all unauthorized senders" },
          { id: "C", text: "Allow all" },
          { id: "D", text: "No policy" }
        ],
        answer: "B"
      },
      {
        number: 37,
        prompt: "What is reverse DNS (PTR record) used for?",
        choices: [
          { id: "A", text: "Mapping an IP address back to a domain name; often used in email reputation checks" },
          { id: "B", text: "Encrypting DNS queries" },
          { id: "C", text: "Speeding up websites" },
          { id: "D", text: "Blocking hackers" }
        ],
        answer: "A"
      },
      {
        number: 38,
        prompt: "Why did Google and Yahoo introduce new email authentication requirements in 2024?",
        choices: [
          { id: "A", text: "To make email slower" },
          { id: "B", text: "To reduce spam and phishing by requiring SPF, DKIM, and DMARC for bulk senders" },
          { id: "C", text: "To charge businesses more" },
          { id: "D", text: "To promote their own email services" }
        ],
        answer: "B"
      },
      {
        number: 39,
        prompt: "What is email spoofing?",
        choices: [
          { id: "A", text: "Sending an email that appears to come from someone else's domain" },
          { id: "B", text: "Encrypting an email" },
          { id: "C", text: "Deleting an email" },
          { id: "D", text: "Forwarding an email" }
        ],
        answer: "A"
      },
      {
        number: 40,
        prompt: "A domain is on a blacklist. What is the first step to resolve it?",
        choices: [
          { id: "A", text: "Ignore it" },
          { id: "B", text: "Identify why it was blacklisted, fix the root cause, then request delisting" },
          { id: "C", text: "Buy a new domain" },
          { id: "D", text: "Send more email" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: "F",
    title: "Scenario-Based — Harder Situations",
    questions: [
      {
        number: 41,
        prompt: "You're on a client call and they start yelling at you about a problem you didn't cause. What do you do?",
        choices: [
          { id: "A", text: "Yell back" },
          { id: "B", text: "Stay calm, acknowledge their frustration, and focus on what you can do to help" },
          { id: "C", text: "Hang up" },
          { id: "D", text: "Blame someone else" }
        ],
        answer: "B",
        explanation: "De-escalation and professionalism."
      },
      {
        number: 42,
        prompt: "Mid-project, you realize you made a mistake that broke the client's email. What do you do?",
        choices: [
          { id: "A", text: "Hide it and hope they don't notice" },
          { id: "B", text: "Immediately inform the client, explain what happened, and outline your fix plan" },
          { id: "C", text: "Blame the client" },
          { id: "D", text: "Delete everything and start over silently" }
        ],
        answer: "B",
        explanation: "Transparency and ownership build trust, even in failure."
      },
      {
        number: 43,
        prompt: "A client asks you to do something that violates Upwork's Terms of Service (e.g., pay off-platform). What do you say?",
        choices: [
          { id: "A", text: "\"Sure, no problem.\"" },
          { id: "B", text: "\"I only work through Upwork for payment and communication—it protects both of us. I'm happy to continue here.\"" },
          { id: "C", text: "\"I'll do it but don't tell anyone.\"" },
          { id: "D", text: "Ignore the message" }
        ],
        answer: "B"
      },
      {
        number: 44,
        prompt: "You're working on a ticket and realize it's outside your skill level. What do you do?",
        choices: [
          { id: "A", text: "Guess and hope for the best" },
          { id: "B", text: "Escalate to a higher tier or your mentor with clear notes on what you've tried" },
          { id: "C", text: "Close the ticket" },
          { id: "D", text: "Tell the client you can't help" }
        ],
        answer: "B"
      },
      {
        number: 45,
        prompt: "A client asks for daily status updates on a 3-day project. What do you do?",
        choices: [
          { id: "A", text: "Ignore them" },
          { id: "B", text: "Send a brief update at the end of each day—what was done, what's next, any blockers" },
          { id: "C", text: "Send one update at the end only" },
          { id: "D", text: "Tell them it's too much work" }
        ],
        answer: "B",
        explanation: "Proactive communication prevents anxiety and builds trust."
      },
      {
        number: 46,
        prompt: "You finish a job and the client goes silent for two weeks. What do you do?",
        choices: [
          { id: "A", text: "Assume they're happy" },
          { id: "B", text: "Send a polite follow-up asking if everything is working and if they'd consider leaving a review" },
          { id: "C", text: "Leave a bad review for them first" },
          { id: "D", text: "Delete the contract" }
        ],
        answer: "B"
      },
      {
        number: 47,
        prompt: "A client shares their screen and you notice a password written on a sticky note. What do you do?",
        choices: [
          { id: "A", text: "Ignore it" },
          { id: "B", text: "Politely mention it as a security risk and suggest a password manager" },
          { id: "C", text: "Take a screenshot" },
          { id: "D", text: "Tell them their security is terrible" }
        ],
        answer: "B",
        explanation: "Educate without shaming."
      },
      {
        number: 48,
        prompt: "You're on a call and your internet drops for 2 minutes. When you return, what do you say?",
        choices: [
          { id: "A", text: "Nothing, just continue" },
          { id: "B", text: "\"Apologies for the interruption—I had a brief local outage. I'm back now. Where were we?\"" },
          { id: "C", text: "Blame the client's connection" },
          { id: "D", text: "Pretend it didn't happen" }
        ],
        answer: "B"
      },
      {
        number: 49,
        prompt: "A client asks you to also manage their social media while you're fixing their DNS. How do you respond?",
        choices: [
          { id: "A", text: "\"Sure, I'll add it for free.\"" },
          { id: "B", text: "\"That's outside the current scope. I'd be happy to send a separate proposal for social media work.\"" },
          { id: "C", text: "\"No.\"" },
          { id: "D", text: "\"I don't know how.\"" }
        ],
        answer: "B",
        explanation: "Professional scope boundary."
      },
      {
        number: 50,
        prompt: "After completing a job, what is the best way to ask for a review?",
        choices: [
          { id: "A", text: "\"Give me 5 stars or I'll report you.\"" },
          { id: "B", text: "\"If you're happy with the work, a 5-star review helps me a lot as I build my profile. Let me know if you need anything else!\"" },
          { id: "C", text: "\"Review me.\"" },
          { id: "D", text: "Don't ask" }
        ],
        answer: "B",
        explanation: "Polite, professional, and framed around your growth."
      }
    ]
  }
];
