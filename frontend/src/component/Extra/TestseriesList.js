import './header1.css'
import './TestSeries.css'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import TestOverview from './TestOverview'
//import TestSeriesHeader from './TestSeriesHeader'
//import TestSeriesFooter from './TestSeriesFooter'
import SpecificTestseries from './SpecificTestseries'
/* import Faq from './Faq'
import TestSeriesAbout from './TestSeriesAbout' */

function TestseriesList() {
	const { exam_mode_id, tier_id } = useParams()
	const [TierName, setPostTierName] = useState()
	const [ExamID, setExamID] = useState()

	useEffect(() => {          
        async function tierId() {
		let tier_ids = { 'tier_id': tier_id }
		let res = await fetch('http://localhost:5000/Breadcrump', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tier_ids)    
		})
		let tier = await res.json()
		setExamID(tier[0]['ExamId'])
		setPostTierName(tier[0]['PostTierId'])
    }

    tierId()
	}, [])

	return (
		<>
			{/* <TestSeriesHeader /> */}
			<TestOverview ExamID={ExamID} TierID={tier_id} TierName={TierName} exam_mode_id={exam_mode_id} />
			<SpecificTestseries exam_post_id={tier_id} exam_mode_id={exam_mode_id} />
			{/* <TestSeriesAbout />
			<Faq /> */}
			{/* <TestSeriesFooter /> */}   
		</>
	)
}

export default TestseriesList