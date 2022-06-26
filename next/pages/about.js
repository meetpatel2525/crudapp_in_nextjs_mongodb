import React from 'react'
import withAuth from './WithAuth';


const about = () => {
  return (
    <div style={{margin:"5%"}} >

  <h1 className='max'><b>Welcome to the Next.js documentation!</b></h1> 
<p>
If you're new to Next.js, we recommend starting with the learn course.

The interactive course with quizzes will guide you through everything you need to know to use Next.js.

If you have questions about anything related to Next.js, you're always welcome to ask our community on GitHub Discussions.
</p>

    </div>
  )
}

export default withAuth(about)