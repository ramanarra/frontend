import React from 'react'
import Typography from '@material-ui/core/Typography';

function privacyPolicy({ }) {
  localStorage.clear()

  return (
    <Typography>
        Virujh's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
    </Typography>
  )
}

export default privacyPolicy
