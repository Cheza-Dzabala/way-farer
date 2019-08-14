/**
 * @swagger
 *
 *
 * definitions:
 *  Trip:
 *     type: "object"
 *     properties:
 *          id:
 *             type: integer
 *             format: int64
 *          bus_license_number:
 *             type: string
 *          seating_capacity:
 *             type: integer
 *             format: int64
 *          trip_date:
 *             type: string
 *             format: date-time
 *          fare:
 *             type: integer
 *             format: int64
 *          origin:
 *             type: string
 *          destination:
 *             type: string
 * /trips:
 *   get:
 *     tags:
 *       - trips
 *     description: Get all trips
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: A list of all trips
 *          type: array
 *          schema:
 *              $ref: '#/definitions/Trip'
 *   post:
 *     tags:
 *       - trips
 *     description: Create a new trips
 *     produces:
 *       - application/json
 *     security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     parameters:
 *        - name: body
 *          description: Create a new trip
 *          in: body
 *          required: true
 *          type: string
 *          schema:
 *              $ref: '#/definitions/Trip'
 *     responses:
 *       200:
 *          description: returned new trip
 *          schema:
 *              $ref: '#/definitions/Trip'
 *       400:
 *          description: Invalid data was supplied to the system
 * /trip/{tripId}/cancel:
 *   patch:
 *      tags:
 *         - trips
 *      description: Cancel a trip
 *      produces:
 *          - application/json
 *      security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      parameters:
 *          - name: trip
 *            description: Id of the trip to be cancelled
 *            in: path
 *            required: true
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *             description: Trip successfully cancelled
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
 */
