/**
 * @summary /はページとしては存在せず、/AttendanceDashboardに飛ばす
 */

import { Route } from 'next'
import { redirect } from 'next/navigation'

export default function Home() {
	const redirectUrl: Route = '/AttendanceDashboard'
	redirect(redirectUrl)
}
