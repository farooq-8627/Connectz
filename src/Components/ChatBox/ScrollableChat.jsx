import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import isSameSender from "../../config/isSameSender";
import { ChatState } from "../../Context/chatProvider";
import isLastMessage from "../../config/isLastMessage";
import { Avatar, Tooltip } from "@mui/material";
import isSameSenderMargin from "../../config/isSameSenderMargin";
import isSameUser from "../../config/isSameUser";

const ScrollableChat = ({ messages }) => {
	const { user } = ChatState();

	return (
		<ScrollableFeed>
			{messages &&
				messages.map((m, i) => (
					<div className="flex" key={m._id}>
						{(isSameSender(messages, m, i, user._id) ||
							isLastMessage(messages, i, user._id)) && (
							<Tooltip title={m.sender.username} placement="bottom-start">
								<>
									<Avatar
										sx={{
											marginTop: isSameUser(messages, m, i, user._id)
												? 0.6
												: 1.6,
											marginRight: 1,
											height: 30,
											width: 30,
											cursor: "pointer",
										}}
										name={m.sender.username}
										src={m.sender.profilePic}
									/>
								</>
							</Tooltip>
						)}
						<span
							style={{
								backgroundColor: `${
									m.sender._id === user._id ? "#33fbee" : "#222831"
								}`,
								color: `${m.sender._id === user._id ? "black" : "white"}`,
								borderRadius: "15px",
								padding: "5px 15px",
								maxWidth: "75%",
								content: "center",
								marginLeft: isSameSenderMargin(messages, m, i, user._id),
								marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
							}}
						>
							{m.content}
						</span>
					</div>
				))}
		</ScrollableFeed>
	);
};

export default ScrollableChat;
