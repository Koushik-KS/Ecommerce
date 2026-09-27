
import {
  useEffect,
  useState,
} from "react";

import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import {
  FaEnvelope,
  FaEye,
  FaReply,
  FaSyncAlt,
  FaTrash,
} from "react-icons/fa";

// =====================================================
// API URL
// =====================================================

const API_URL =
  "http://localhost:4000/api/messages";

// =====================================================
// MESSAGES COMPONENT
// =====================================================

function Messages() {
  // =====================================================
  // STATES
  // =====================================================

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showReplyModal, setShowReplyModal] =
    useState(false);

  const [replyText, setReplyText] = useState("");

  const [replyLoading, setReplyLoading] =
    useState(false);

  // =====================================================
  // FETCH MESSAGES
  // =====================================================

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch messages."
        );
      }

      setMessages(data.data || []);
    } catch (error) {
      console.error(
        "Fetch messages error:",
        error
      );

      setError(
        error.message ||
          "Unable to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchMessages();
  }, []);

  // =====================================================
  // VIEW MESSAGE AND MARK AS READ
  // =====================================================

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setShowViewModal(true);

    if (message.status !== "unread") {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${message._id}/read`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to mark message as read."
        );
      }

      const updatedMessage =
        data.data || {
          ...message,
          status: "read",
        };

      setMessages((previousMessages) =>
        previousMessages.map((item) =>
          item._id === message._id
            ? updatedMessage
            : item
        )
      );

      setSelectedMessage(updatedMessage);
    } catch (error) {
      console.error(
        "Mark as read error:",
        error
      );
    }
  };

  // =====================================================
  // OPEN REPLY MODAL
  // =====================================================

  const handleOpenReply = (message) => {
    setSelectedMessage(message);
    setReplyText(message.reply || "");
    setShowReplyModal(true);
  };

  // =====================================================
  // SAVE REPLY
  // =====================================================

  const handleReply = async (event) => {
    event.preventDefault();

    if (!selectedMessage) {
      return;
    }

    if (!replyText.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      setReplyLoading(true);

      const response = await fetch(
        `${API_URL}/${selectedMessage._id}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reply: replyText.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save reply."
        );
      }

      setMessages((previousMessages) =>
        previousMessages.map((item) =>
          item._id === selectedMessage._id
            ? data.data
            : item
        )
      );

      setSelectedMessage(data.data);
      setShowReplyModal(false);
      setReplyText("");

      alert("Reply saved successfully.");
    } catch (error) {
      console.error(
        "Reply error:",
        error
      );

      alert(
        error.message ||
          "Failed to save reply."
      );
    } finally {
      setReplyLoading(false);
    }
  };

  // =====================================================
  // DELETE MESSAGE
  // =====================================================

  const handleDeleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete message."
        );
      }

      setMessages((previousMessages) =>
        previousMessages.filter(
          (message) => message._id !== id
        )
      );

      if (
        selectedMessage &&
        selectedMessage._id === id
      ) {
        setSelectedMessage(null);
        setShowViewModal(false);
        setShowReplyModal(false);
      }

      alert("Message deleted successfully.");
    } catch (error) {
      console.error(
        "Delete message error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete message."
      );
    }
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = (status) => {
    if (status === "unread") {
      return (
        <Badge bg="danger">
          Unread
        </Badge>
      );
    }

    if (status === "replied") {
      return (
        <Badge bg="success">
          Replied
        </Badge>
      );
    }

    return (
      <Badge bg="secondary">
        Read
      </Badge>
    );
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="messages-page">
        <div className="text-center py-5">
          <Spinner animation="border" />

          <p className="mt-3">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="messages-page">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="messages-header mb-4">
        <div>
          <h2 className="mb-1">
            Messages
          </h2>

          <p className="text-muted mb-3">
            Manage customer order messages
          </p>
        </div>

        {/* Refresh button below heading */}

        <Button
          variant="primary"
          onClick={fetchMessages}
        >
          <FaSyncAlt className="me-2" />
          Refresh
        </Button>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="message-summary-card shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">
                Total Messages
              </h6>

              <h3>
                {messages.length}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="message-summary-card shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">
                Unread Messages
              </h6>

              <h3 className="text-danger">
                {
                  messages.filter(
                    (message) =>
                      message.status === "unread"
                  ).length
                }
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="message-summary-card shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">
                Replied Messages
              </h6>

              <h3 className="text-success">
                {
                  messages.filter(
                    (message) =>
                      message.status === "replied"
                  ).length
                }
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* =================================================
          MESSAGES TABLE
      ================================================= */}

      <Card className="messages-table-card shadow-sm border-0">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <FaEnvelope className="me-2" />

            <h5 className="mb-0">
              Customer Messages
            </h5>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-5">
              <h5>
                No messages found
              </h5>

              <p className="text-muted">
                Customer order messages will
                appear here.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table
                bordered
                hover
                className="messages-table align-middle"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Order ID</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map(
                    (message, index) => (
                      <tr
                        key={message._id}
                        className={
                          message.status === "unread"
                            ? "table-warning"
                            : ""
                        }
                      >
                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {message.customerName}
                          </strong>

                          <br />

                          <small className="text-muted">
                            {message.customerEmail}
                          </small>
                        </td>

                        <td>
                          {message.orderId}
                        </td>

                        <td>
                          <span
                            title={message.message}
                          >
                            {message.message.length >
                            45
                              ? `${message.message.substring(
                                  0,
                                  45
                                )}...`
                              : message.message}
                          </span>
                        </td>

                        <td>
                          {getStatusBadge(
                            message.status
                          )}
                        </td>

                        <td>
                          {message.createdAt
                            ? new Date(
                                message.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td>
                          <div className="message-actions d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              title="View Message"
                              onClick={() =>
                                handleViewMessage(
                                  message
                                )
                              }
                            >
                              <FaEye />
                            </Button>

                            <Button
                              variant="outline-success"
                              size="sm"
                              title="Reply"
                              onClick={() =>
                                handleOpenReply(
                                  message
                                )
                              }
                            >
                              <FaReply />
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Delete"
                              onClick={() =>
                                handleDeleteMessage(
                                  message._id
                                )
                              }
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* =================================================
          VIEW MESSAGE MODAL
      ================================================= */}

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Message Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedMessage && (
            <>
              <p>
                <strong>
                  Customer:
                </strong>{" "}
                {selectedMessage.customerName}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {selectedMessage.customerEmail}
              </p>

              <p>
                <strong>
                  Order ID:
                </strong>{" "}
                {selectedMessage.orderId}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {getStatusBadge(
                  selectedMessage.status
                )}
              </p>

              <hr />

              <p>
                <strong>
                  Customer Message:
                </strong>
              </p>

              <div className="message-content">
                {selectedMessage.message}
              </div>

              {selectedMessage.reply && (
                <>
                  <hr />

                  <p>
                    <strong>
                      Admin Reply:
                    </strong>
                  </p>

                  <div className="message-reply">
                    {selectedMessage.reply}
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </Button>

          {selectedMessage && (
            <Button
              variant="success"
              onClick={() => {
                setShowViewModal(false);

                handleOpenReply(
                  selectedMessage
                );
              }}
            >
              <FaReply className="me-2" />
              Reply
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* =================================================
          REPLY MODAL
      ================================================= */}

      <Modal
        show={showReplyModal}
        onHide={() => setShowReplyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Reply to Customer
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleReply}>
          <Modal.Body>
            {selectedMessage && (
              <>
                <p>
                  <strong>
                    Customer:
                  </strong>{" "}
                  {selectedMessage.customerName}
                </p>

                <p>
                  <strong>
                    Order ID:
                  </strong>{" "}
                  {selectedMessage.orderId}
                </p>

                <Form.Group>
                  <Form.Label>
                    Your Reply
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter your reply..."
                    value={replyText}
                    onChange={(event) =>
                      setReplyText(
                        event.target.value
                      )
                    }
                    required
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                setShowReplyModal(false)
              }
              disabled={replyLoading}
            >
              Cancel
            </Button>

            <Button
              variant="success"
              type="submit"
              disabled={replyLoading}
            >
              {replyLoading ? (
                <>
                  <Spinner
                    size="sm"
                    className="me-2"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <FaReply className="me-2" />
                  Save Reply
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Messages;