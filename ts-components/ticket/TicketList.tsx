import Link from 'next/link';
import { Grid, Card } from 'styles/styled-components/common/BaseComponents';
import { TicketComponents } from 'styles/styled-components/ticket/TicketComponents';

function TicketList(props: { tickets: any }) {
	return (
		<>
			<table className="base-table">
				{/* <thead>
									<tr>
										<th>이름</th>
										<th>email</th>
										<th>그룹</th>
									</tr>
								</thead> */}
				<tbody>
					{props.tickets?.map((ticket: any, ticketIndex: number) => {
						return (
							<tr key={`ticket-tr-${ticketIndex}`}>
								<th>
									<Link href={`/ticket/${ticket.id}`}>{ticket.name}</Link>
								</th>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default TicketList;
