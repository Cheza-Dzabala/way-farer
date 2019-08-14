/**
 * @swagger
 * definitions:
 *  User:
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
 *              default: false
 *          token:
 *              type: string
 *              format: password
 *
 * /auth/signin:
 *   post:
 *     tags:
 *       - authentication
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: body
 *          description: email and password needed to log into the application
 *          in: body
 *          required: true
 *          type: string
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                      format: int64
 *     responses:
 *       200:
 *          description: returned new user object
 *          schema:
 *              $ref: '#/definitions/UserModel'
 *       404:
 *          description: user was not found in the system
 *
 * /auth/signup:
 *   post:
 *     tags:
 *       - authentication
 *     description: Sign up to the application
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: body
 *          description: Sign up for the way farer application
 *          in: body
 *          required: true
 *          type: string
 *          schema:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *
 *     responses:
 *       200:
 *          description: returned new user object
 *          schema:
 *              $ref: '#/definitions/User'
 *       400:
 *          description: Invalid data was supplied to the system
 *
 */
