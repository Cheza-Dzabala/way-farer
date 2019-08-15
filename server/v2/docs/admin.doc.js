/**
 * @swagger
 * definitions:
 *  Admin:
 *      type: object
 *      required:
 *          - id
 *          - email
 *          - first_name
 *          - last_name
 *          - token
 *      properties:
 *          id:
 *              type: integer
 *              format: int64
 *          email:
 *              type: string
 *          first_name:
 *              type: string
 *          last_name:
 *              type: string
 *          is_admin:
 *              type: boolean
 *              default: true
 *          token:
 *              type: string
 *
 * /admin:
 *   get:
 *     tags:
 *       - admins
 *     description: Get all admins
 *     produces:
 *       - application/json
 *     security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *     responses:
 *       200:
 *          description: A list of all admins
 *          type: array
 *          schema:
 *              $ref: '#/definitions/Admin'

 *   post:
 *     tags:
 *       - admins
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: body
 *          description: email and password needed to log into the application
 *          in: body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *     security:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 *     responses:
 *       200:
 *          description: returned new user object
 *          schema:
 *              $ref: '#/definitions/Admin'
 *       404:
 *          description: user was not found in the system
 *
 */
