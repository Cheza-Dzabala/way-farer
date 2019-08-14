
/**
 * @swagger
 *
 *
 * definitions:
 *  Booking:
 *     type: "object"
 *     properties:
 *          booking_id:
 *             type: integer
 *             format: int64
 *          allocated_seat:
 *             type: string
 *          bus_license_number:
 *             type: string
 *          trip_date:
 *             type: string
 *             format: date-time
 *          first_name:
 *             type: string
 *          last_name:
 *             type: string
 *          user_email:
 *             type: string
 * /bookings:
 *   get:
 *     tags:
 *       - booking
 *     description: Get all bookings
 *     produces:
 *       - application/json
 *     security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     responses:
 *       200:
 *          description: A list of bookings
 *          type: array
 *          schema:
 *              $ref: '#/definitions/Booking'
 *   post:
 *     tags:
 *       - booking
 *     description: Create a new booking
 *     produces:
 *       - application/json
 *     security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     parameters:
 *        - name: body
 *          description: Create new booking
 *          in: body
 *          required: true
 *          type: string
 *          schema:
 *              type: object
 *              properties:
 *                  trip_id:
 *                      type: integer
 *                      format: int64
 *                  seat_number:
 *                      type: string
 *     responses:
 *       200:
 *          description: returned new booking
 *          schema:
 *              $ref: '#/definitions/Booking'
 *       400:
 *          description: Invalid data was supplied to the system
 * /booking/{bookingId}:
 *   patch:
 *      tags:
 *         - booking
 *      description: Cancel a booking
 *      produces:
 *          - application/json
 *      security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      parameters:
 *          - name: booking
 *            description: Id of the booking to be cancelled
 *            in: path
 *            required: true
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *             description: Booking successfully cancelled
 *             content:
 *                  application/json
 *             schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *
 *   delete:
 *      tags:
 *         - booking
 *      description: Delete a booking
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: booking
 *            description: Id of the booking to be deleted
 *            in: path
 *            required: true
 *            type: integer
 *            format: int64
 *      security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      responses:
 *          200:
 *             description: Booking successfully deleted
 *             content:
 *                  application/json
 *             schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *
 *
 *
 *
 */
