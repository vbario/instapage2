const stripeService = require('./stripe')
const stripe = stripeService.stripe
const firebaseService = require('./firebase')
const firebase = firebaseService.firebase
const admin = firebaseService.admin
const paths = require('./paths').paths


let payForNextStep = async (uid, agentid, submissionid, payment_source) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      // get account which will be used to receive money
      console.log('==>', uid, agentid, submissionid)
      let accountRef = paths.USER_CONNECT_IDS + (agentid || 'f')
      let snap = await db.ref(accountRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id

      console.log('agent_account_id: accountid', accountid)

      // SUBMISSIONS_PATH
      // ADMIN_SUBMISSIONS_PATH

      // get submission
      let submissionRef = paths.SUBMISSIONS_PATH + (agentid || 'f') + '/' + (submissionid || 'f')
      let snap2 = await db.ref(submissionRef).once('value')
      let submission = snap2.val() || {}
      let postId = submission.post.uniqueProductId

      // get amount to be paid
      let postRef = paths.POSTS_PATH + (postId || 'f')
      let snap3 = await db.ref(postRef).once('value')
      let post = snap3.val() || {}

      let steps = post.steps
      let status = submission.status
      let step = status[0]
      let stepData = steps[step]
      let reward = stepData.rewards
      let payout = reward.success.amount

      console.log('payout', status, step, payout)
      console.log('post', status, step, payout)
      // >  payout 0-started 0 50

      let iAmThisCandidate = submission.candidate.candidateNameAndEmail.iAmThisCandidate
      let lastStep = steps.length == step - 1

      // execute transaction
      let _stripeid = await db.ref(paths.EMPOLOYER_STRIPE_ACCOUNT_ID_PATH + '/' + uid).once('value')
      let stripeid = _stripeid.val()

      let percentExtra = 5
      let finalStepFee = 500
      let charge

      if (!lastStep && iAmThisCandidate) {
        // let totalCharge = payout * 100
        let totalCharge = payout * 100 * (1 + (percentExtra/100))
        charge = await stripe.charges.create({
              amount: totalCharge,
              currency: 'usd',
              customer: stripeid.id,
              source: payment_source,
              description: `Description...`,
              // application_fee_amount: totalFee,
              // destination: {
              //       account: 'acct_1LMjHZJJW3PNoW9E'
              // }
        })
      } else {
        // calculate split
        let totalCharge 
        let totalFee 
        if (lastStep) {
          totalCharge = (payout + finalStepFee) * 100
          totalFee = finalStepFee * 500
        } else {
          totalCharge = payout * 100 * (1 + percentExtra/100)
          totalFee = payout * 100 * (percentExtra/100)
        }

        charge = await stripe.charges.create({
              amount: totalCharge,
              currency: 'usd',
              customer: stripeid.id,
              source: payment_source,
              description: `Description...`,
              application_fee_amount: totalFee,
              destination: {
                    account: accountid
              }
        })
      }

      let newCharge = await db.ref(paths.EMPLOYER_CHARGES + '/' + uid).push({
            charge,
            employer: uid,
            agent: agentid,
            submission: submissionid,
      })

      let now = (new Date()).getTime()

      let rewardObject = {
          // i,
          submissionid,
          step,
          status,
          recruiterUid: uid,
          submission,
          postid: post.uniqueProductId,
          agentid,
          time: now,
          reward: payout*100,
          currency: 'usd',
          post
          // status,
      }

      console.log('reward object', rewardObject)

      // push reward to agent's rewards ref /rewards/agentUid/projectUid/[rewards]
      let agentRewards = '/rewards/' + (agentid || 'f') + '/' + (submissionid || 'f')
      // push reward to recruiter's payouts ref /agentPayouts/recruiterUid/projectUid/[rewards]
      let recruiterRewards = '/employerCharges/' + (uid || 'f') + '/' + (postId || 'f') + '/' + (submissionid || 'f')
      // push reward to agent's submission ref /submissions/agentUid/projectUidInternal/rewards/[rewards]
      let agentSubmission = '/submissions/' + (agentid || 'f') + '/' + ((submissionid || 'f') || 'f') + '/rewards'
      // push reward to recruiter's submission ref /admin_submissions/recruiterUid/projectUidInternal/rewards/[rewards]
      let recruiterSubmission = '/admin_submissions/' + (uid || 'f') + '/' + ((submissionid || 'f') || 'f') + '/rewards'
      // push reward to recruiter's user info ref - by users => /payouts --- USER_DATA_PATH/recruiterId/agentId/rewards/[rewards]
      // let recruiterUserInfo = USER_DATA_PATH + (uid || 'f') + '/' + agentid + '/rewards'

      if (lastStep || !iAmThisCandidate) {
        let submitted1 = await db.ref(agentRewards).push(rewardObject)
        let newKey = submitted1.key
        let submitted2 = await db.ref(recruiterRewards).child(newKey).set(rewardObject)
        let submitted3 = await db.ref(agentSubmission).child(newKey).set(rewardObject)
        let submitted4 = await db.ref(recruiterSubmission).child(newKey).set(rewardObject)
      }
      // let submitted5 = await db.ref(recruiterUserInfo).child(newKey).set(rewardObject)
        
      // return result
      return resolve({
            success: true,
            data: {
                  // chargeKey: newCharge.key,
            }
      })
  })
}


exports.payForNextStep = payForNextStep